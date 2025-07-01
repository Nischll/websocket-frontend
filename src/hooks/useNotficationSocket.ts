import { useEffect, useState } from "react";
import { useWebSocket } from "../components/ContextApi/WebSocketProvider/WebSocketProvider";

export const useNotificationSocket = (userId: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { subscribe, unsubscribe, isConnected } = useWebSocket();

  useEffect(() => {
    const topic = `/topic/notification/user/${userId}`;
    const handleNotification = (msg: any) => {
      const data = JSON.parse(msg.body);
      setNotifications((prev) => [data, ...prev]);
    };

    subscribe(topic, handleNotification);
    return () => unsubscribe(topic);
  }, [userId, isConnected]);

  return { notifications };
};
