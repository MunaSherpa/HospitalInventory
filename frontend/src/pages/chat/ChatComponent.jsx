// import React, { useCallback, useEffect, useState } from "react";
// import ListUser from "../../pages/chat/ListUser";
// import Message from "../../pages/chat/Message";
// import axios from "axios";

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [msg, setMsg] = useState("");

//   const fetchMessages = useCallback(async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/receivemessage");
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.log("Error fetching messages:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//   }, [fetchMessages]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/sendmessage", {
//         messageContent: msg,
//       });
//       fetchMessages();
//       setMsg("");
//     } catch (error) {
//       console.log("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="absolute bottom-5 right-2 w-[500px] flex  gap-4 p-3 bg-gray-200">
//       <div className="bg-white rounded-lg p-8 w-full">
//         <Message
//           messages={messages}
//           onSendMessage={sendMessage}
//           setMsg={setMsg}
//           msg={msg}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;














import React, { useCallback, useEffect, useState } from "react";
import ListUser from "./ListUser";
import Message from "./Message";
import axios from "axios";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/receivemessage");
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/sendmessage", {
        messageContent: msg,
      });
      fetchMessages();
      setMsg("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="absolute bottom-5 right-2 w-[500px] flex gap-4 p-3 bg-gray-200">
      <ListUser />
      <div className="bg-white rounded-lg p-8 w-full">
        <Message
          messages={messages}
          onSendMessage={sendMessage}
          setMsg={setMsg}
          msg={msg}
        />
      </div>
    </div>
  );
};

export default ChatComponent;


