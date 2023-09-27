import React from "react";
import axios from "axios";

function LogOut () {


    const handleLogOut = async () => {

        try {
            const response = await axios.get('http://localhost:3000/logout');
      
            if (response.status === 200) {
                console.log('User succesfully logged out');
                navigate('/')
    
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