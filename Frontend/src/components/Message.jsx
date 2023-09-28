import React from "react";
import '../chat.css'

function Message() {
    const socket = io();

    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });
    socket.on('chat message', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    return (
        <>
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autocomplete="off" /><button>Send</button>
            </form>
        </>
    );
}

export default Message;