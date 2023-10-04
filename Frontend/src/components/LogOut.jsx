import React from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function LogOut() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogOut = async () => {
        // console.log("test");

        try {
            const response = await axios.get('https://mern-pet-adoption.onrender.com/logout');

            if (response.status === 200) {
                logout();
                console.log('User succesfully logged out');
                navigate('/');

            } else {
                console.error('Server error:', response.data);
            }
        } catch (error) {

            console.error('Server error: something went wrong');

        }
    }



    return (
        <>
            <button className="button menu-button" onClick={handleLogOut}>Log out</button>
        </>
    );
}

export default LogOut;