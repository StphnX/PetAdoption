import React, { useState, useEffect } from "react";
import '../chat.css';
import io from 'socket.io-client';

function Message() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = io();

    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('chat message', (msg) => {
            // Update the messages state with the new message
            setMessages([...messages, msg]);
            // Scroll to the bottom of the message container
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue) {
            // Emit the chat message to the server
            socket.emit('chat message', inputValue);
            setInputValue('');
        }
    };

    const messagesEndRef = React.createRef();

    return (
        <div>
            <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
                <div ref={messagesEndRef}></div>
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    id="input"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Message;
