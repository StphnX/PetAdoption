import React from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function LogOut () {
    const { user, logout } = useAuth();


    const handleLogOut = async () => {

        try {
            const response = await axios.get('http://localhost:3000/logout');
      
            if (response.status === 200) {
                logout();
                console.log('User succesfully logged out');
                console.log(user);
                // navigate('/')
    
            } else {
                console.error('Server error:', response.data);
            }
          } catch (error) {
    
                console.error('Server error: something went wrong');
                
            }
    }
    
   
    
    return(
        <>
            <button onSubmit={handleLogOut}>Log out</button>
        </>
    );
}

export default LogOut;