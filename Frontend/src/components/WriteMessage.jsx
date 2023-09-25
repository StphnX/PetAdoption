import React from "react";

function WriteMessage () {
    
    return(
        <>
        <div className="write-message-container box">
            <form action="" className="message-form">
                <label htmlFor="message">Your message:</label>
                <textarea className="box" name="message" id="message" cols="30" rows="10"></textarea>
                <button className="button" type="submit">Send</button>
            </form>
        </div>
        </>
    );
}

export default WriteMessage;