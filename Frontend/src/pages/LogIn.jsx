import React from "react";

function LogIn () {

    return (
        <>
        <main>
            <h1 className="margin">Log in to your account:</h1>
                <form action="" className="sign-up-form">
                    <div className="input-container">
                        <label for="name">First name:</label><br></br>
                        <input type="text" id="name" />
                    </div>
                    <div className="input-container">
                        <label for="surname">Last name:</label><br></br>
                        <input type="text" id="surname"/>
                    </div>
                    <button className="sign-up-form-button" type="submit">Submit</button>
                </form>
        </main>
        </>
    );
}

export default LogIn;