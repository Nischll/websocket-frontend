import { useState } from "react";
import { useWebSocket } from "../../../components/ContextApi/WebSocketProvider/WebSocketProvider";
import { useNotificationSocket } from "../../../hooks/useNotficationSocket";

const ChatRoom = () => {
  const { notifications } = useNotificationSocket("123");
  const { isConnected, subscribe, clientRef } = useWebSocket();
  // const ws = useWebSocket();
  const [message, setMessage] = useState<string | null>(null);

  const handleSendTest = () => {
    if (isConnected) {
      subscribe("/topic/notification/user/123", (msg) => {
        console.log("📩 Received msg:", msg.body);
      });

      clientRef?.current?.publish({
        destination: "/app/notify.user/123",
        body: JSON.stringify(message),
      });
      setMessage("");
    } else {
      console.log("WebSocket not connected yet.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1">
        <h1>Notifications:</h1>
        <div className="h-96 bg-gray-400 w-full text-center py-5 px-3 overflow-y-auto rounded-md space-y-1.5">
          {" "}
          {notifications.map((note, i) => (
            <div key={i}>{JSON.stringify(note)}</div>
          ))}
        </div>
        <input
          type="text"
          className="border border-black rounded-md"
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
        />
        <button onClick={handleSendTest}>Send Test Notification</button>
      </div>
    </>
  );
};

export default ChatRoom;
