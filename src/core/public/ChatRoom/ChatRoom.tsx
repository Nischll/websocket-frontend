import { useState } from "react";
import { useWebSocket } from "../../../components/ContextApi/WebSocketProvider/WebSocketProvider";
import { useChatSocket } from "../../../hooks/useChatSocket";

const ChatRoom = () => {
  const { messages } = useChatSocket("123");
  const { isConnected, subscribe, clientRef } = useWebSocket();
  // const ws = useWebSocket();
  const [message, setMessage] = useState<string | null>(null);

  const handleSendTest = () => {
    if (isConnected) {
      subscribe("/topic/site/123", (msg) => {
        console.log("📩 Received msg:", msg.body);
      });

      clientRef?.current?.publish({
        destination: "/app/chat.send/123",
        body: JSON.stringify({
          senderId: "1",
          receiverId: "2",
          siteId: "123",
          content: message,
        }),
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
          {messages.map((msg, i) => (
            <div key={i} className="bg-white rounded p-2 text-left shadow-sm">
              <p className="text-sm font-semibold">
                From: {msg.senderId} → To: {msg.receiverId}
              </p>
              <p className="text-sm">Message: {msg.content}</p>
              <p className="text-xs text-gray-600">
                Sent at: {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
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
