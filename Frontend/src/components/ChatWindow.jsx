import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const generateRoomId = (userId1, userId2) => {
  const sortedUserIds = [userId1, userId2].sort();
  return sortedUserIds.join('-');
};

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState('6515a1084d77dcd1da8b2be2'); 
  const [roomId, setRoomId] = useState(''); 
  const socket = io("http://localhost:3000/"); 

  useEffect(() => {
    const newRoomId = generateRoomId(recipientId, recipientId);
    setRoomId(newRoomId);

    socket.emit('join_room', { room: newRoomId, username: recipientId });

    socket.on('message', (message) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

  }, [recipientId])

  const sendMessage = () => {
    socket.emit('sendMessage', { to: roomId, message, from: recipientId });
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
