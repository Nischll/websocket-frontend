import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <>
      <div>
        HOME
        <div className="h-96 bg-gray-400 w-full text-center py-5 px-3 overflow-y-auto rounded-md space-y-1.5">
          {" "}
          {message}
        </div>
        <input
          type="text"
          className="border border-black rounded-md"
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
        />
      </div>
    </>
  );
};

export default Home;
