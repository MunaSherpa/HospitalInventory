import React, { useState } from "react";
// import ChatComponent from "./ChatComonent";
import ChatComponent from "../../dashboard/chat/ChatComponent";


const Chats = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <button className="bg-red-600" onClick={() => setOpen(!open)}>Chat</button>
      {open && <ChatComponent />}
    </div>
  );
};

export default Chats;
