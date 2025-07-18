import { useEffect, useState } from "react";
import { useWebSocket } from "../components/ContextApi/WebSocketProvider/WebSocketProvider";

export const useChatSocket = (siteId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const { subscribe, unsubscribe, isConnected } = useWebSocket();

  useEffect(() => {
    if (!isConnected) return;
    
    const topic = `/topic/site/${siteId}`;
    const handleMessage = (msg: any) => {
      const data = JSON.parse(msg.body);
      setMessages((prev) => [...prev, data]);
    };

    subscribe(topic, handleMessage);
    return () => unsubscribe(topic);
  }, [siteId, subscribe, unsubscribe]);

  return { messages };
};
