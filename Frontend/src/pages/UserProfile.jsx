import React from "react";
import { useAuth } from '../context/AuthContext';

function UserProfile () {
    const { user, logout } = useAuth();

    return (
        <div className="user-profile-container box">
            <h1>Hello, {user.user}</h1>

        </div>

    );
}

export default UserProfile;