import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { socketUrl } from "../../../constants/Url/SocketUrl";

interface SubscriptionMap {
  [topic: string]: {
    callback: (msg: IMessage) => void;
    subscription?: StompSubscription;
  };
}

interface WebSocketContextType {
  subscribe: (topic: string, callback: (msg: IMessage) => void) => void;
  unsubscribe: (tpiic: string) => void;
  isConnected: boolean;
  clientRef: RefObject<Client | null>;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

// const getToken = () => {
//   return localStorage.getItem("accessToken");
// };

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const clientRef = useRef<Client>(null);
  const subscriptions = useRef<SubscriptionMap>({});
  const isConnectedRef = useRef(false);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    // const token = getToken();

    const client = new Client({
      brokerURL: `${socketUrl}`,
      // connectHeaders: {
      //   Authorization: `Bearer ${token}`,
      // },
      reconnectDelay: 5000,

      onConnect: () => {
        isConnectedRef.current = true;
        Object.entries(subscriptions.current).forEach(([topic, entry]) => {
          const sub = client.subscribe(topic, entry.callback);
          subscriptions.current[topic].subscription = sub;
        });
        setIsConnected(true);
        console.log("connected");
      },

      onDisconnect: () => {
        isConnectedRef.current = false;
        setIsConnected(false);
      },

      onStompError: (frame) => {
        console.log("STOMP Error: ", frame);
      },
    });
    client.activate();
    clientRef.current = client;
  }, []);

  useEffect(() => {
    connect();

    return () => {
      clientRef.current?.deactivate();
    };
  }, [connect]);

  const subscribe = (topic: string, callback: (msg: IMessage) => void) => {
    if (!clientRef.current || !isConnectedRef.current) return;

    const sub = clientRef.current.subscribe(topic, callback);
    subscriptions.current[topic] = { callback, subscription: sub };
  };

  const unsubscribe = (topic: string) => {
    subscriptions.current[topic]?.subscription?.unsubscribe();
    delete subscriptions.current[topic];
  };

  const contextValue: WebSocketContextType = {
    subscribe,
    unsubscribe,
    isConnected,
    clientRef,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  // console.log("websocket context", ctx);
  return ctx;
};
