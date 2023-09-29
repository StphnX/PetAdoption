import React from "react";
import Message from "../components/Message";
import ChatWindow from "../components/ChatWindow";

function Messages () {

    return (
        <>
            <h1>Messages displayed here: </h1>
            {/* TO DO Main container for displaying anything chat related */}
            <div className="main-chat-container">
                <div className="messages-listed-container">

                </div>
                <div className="chat-window-container">
                    <ChatWindow/>
                </div>
            </div>
            {/* TO DO on the left hand we need a list off all the current chats that this user has*/}
            {/* TO DO on the right we need a chat window for a singular interaction between two users*/}
            {/* TO DO inside of this one a fowm for the user to write inside of*/}

            
        </>
    );
}

export default Messages;