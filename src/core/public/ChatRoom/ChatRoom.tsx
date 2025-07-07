import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../../../components/ContextApi/WebSocketProvider/WebSocketProvider";
import { useChatSocket } from "../../../hooks/useChatSocket";
import axios from "axios";

const ChatRoom = () => {
  const { messages: liveMessages } = useChatSocket("123");
  const { isConnected, clientRef } = useWebSocket();
  const [message, setMessage] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/chat/history?siteId=${123}&receiverId=${2}`
      );
      setChatHistory(res.data);
      // console.log(res.data);
    };
    fetchChatHistory();
  }, []);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [liveMessages]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto", // for initial load (no smooth needed)
        block: "end",
      });
      console.log("history msg");
    } 
  }, [chatHistory, liveMessages]);

  const handleSendTest = () => {
    if (isConnected) {
      // subscribe("/topic/site/123", (msg) => {
      //   console.log("📩 Received msg:", msg.body);
      //   console.log(msg.body.length);
      // });

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

  const allMessages = [...chatHistory, ...liveMessages];

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1">
        <h1>Messages:</h1>
        <div className="h-96 bg-gray-400 w-full text-center py-5 px-3 overflow-y-auto rounded-md space-y-1.5">
          {allMessages.map((msg, i) => (
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
          <div ref={bottomRef} />
        </div>

        <input
          type="text"
          className="w-md border border-black rounded-md p-2"
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
        />
        <button onClick={handleSendTest}>Send Message</button>
      </div>
    </>
  );
};

export default ChatRoom;
