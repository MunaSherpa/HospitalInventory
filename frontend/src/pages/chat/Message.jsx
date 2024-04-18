// import React, { useState, useEffect, useRef } from "react";

// const Message = ({ messages, onSendMessage, setMsg, msg }) => {
//   let currentUserId = localStorage.getItem("id");
//   const messagesEndRef = useRef(null);

//   console.log(currentUserId);


//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const renderMessage = (message) => {
//     let messageClass = ""; // Default class


//     // Determine message alignment based on current user's role (sender/receiver)
//     if (message.sender === currentUserId) {
//       messageClass = "text-right"; // Sent by current user, align right
//     } else {
//       messageClass = "text-left"; // Received by current user, align left
//     }

//     return (
//       <div key={message.id} className={`mb-2 ${messageClass}`}>
//         <p>{message.content}</p>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="h-[200px] w-full overflow-y-auto">
//         {messages.map((message) => renderMessage(message))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={onSendMessage}>
//         <input
//           type="text"
//           name="message"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Message;




import React, { useState, useEffect, useRef } from "react";

const Message = ({ messages, onSendMessage, setMsg, msg }) => {
  let currentUserId = localStorage.getItem("id");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessage = (message) => {
    console.log("fetching data");
    console.log(currentUserId);
    console.log(message.sender);
    console.log("fetching data");
    
    const isSentByCurrentUser = message.sender == currentUserId;
    // const isReceivedByCurrentUser = message.chat.receiver_id === currentUserId;

    let messageClass = ""; // Default class

    // Determine message alignment based on current user's role (sender/receiver)
    if (isSentByCurrentUser) {
      messageClass = "text-left"; // Received by current user, align left
    } else {
      messageClass = "text-right text-green-400"; // Sent by current user, align right
    }

    return (
      <div key={message.id} className={`mb-2 ${messageClass}`}>
        <p>{message.content}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="h-[200px] w-full overflow-y-auto">
        {messages?.messages?.map((message) => renderMessage(message))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={onSendMessage}>
        <input
          type="text"
          name="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;









// import React, { useState, useEffect, useRef } from "react";

// const Message = ({ messages, onSendMessage, setMsg, msg }) => {
//   const currentUserId = localStorage.getItem("id"); // Assuming id is stored in localStorage
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const renderMessage = (message) => {
//     let messageClass = ""; // Default class

//     // Determine message alignment based on current user's role (sender/receiver)
//     if (message.sender === currentUserId) {
//       messageClass = "text-right"; // Sent by current user, align right
//     } else {
//       messageClass = "text-left"; // Received by current user, align left
//     }

//     return (
//       <div key={message.id} className={`mb-2 ${messageClass}`}>
//         <p>{message.content}</p>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="h-[200px] w-full overflow-y-auto">
//         {messages.map((message) => renderMessage(message))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={onSendMessage}>
//         <input
//           type="text"
//           name="message"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Message;
















// import React from "react";

// const Message = ({ messages, onSendMessage, setMsg, msg }) => {
//   const renderMessage = (message) => {
//     return (
//       <div key={message.id} className="mb-2">
//         <p>{message.content}</p>
//       </div>
//     );
//   };

//   if (!messages || messages.length === 0) {
//     return <div>No messages available.</div>;
//   }

//   return (
//     <div>
//       <div>
//         {messages.map((message) => renderMessage(message))}
//       </div>
//       <form onSubmit={onSendMessage}>
//         <input
//           type="text"
//           name="message"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Message;





// // components/Message.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// function Message() {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   useEffect(() => {
//     socket.on('allMessages', (allMessages) => {
//       setMessages(allMessages);
//     });

//     socket.on('newMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('allMessages');
//       socket.off('newMessage');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '') {
//       const newMessage = {
//         text: inputMessage,
//         sender: 'user',
//       };

//       socket.emit('sendMessage', newMessage);
//       setInputMessage('');
//     }
//   };

//   return (
//     <div>
//       <h1>Real-time Chat App</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.sender}: </strong> {message.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default Message;
