import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListUser from "../../pages/chat/ListUser";
import Message from "../../pages/chat/Message";

const ChatComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/chats");
      setUsers(response.data.chats);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`http://localhost:3001/receivemessage?userId=${user.id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const [msg, setMsg] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/sendmessage", {
        receiverId: selectedUser.participants[0]._id,
        messageContent: msg,
      });
      fetchUsers();
      setMsg("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="absolute bottom-5 right-2 w-[500px] flex gap-4 p-3 bg-gray-200">
      <ListUser users={users} onUserSelect={handleUserSelect} />
      <div className="bg-white rounded-lg p-8 w-full">
        {selectedUser && (
          <Message
            messages={messages}
            onSendMessage={sendMessage}
            setMsg={setMsg}
            msg={msg}
          />
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
