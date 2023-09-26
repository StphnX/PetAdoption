import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useEffect } from "react";



function LogIn () {

    const location = useLocation();
    const navigate = useNavigate();
    
    const initialLoginData = {
        email: location.state?.email || "",
        password: location.state?.password || ""
    };

    const [loginData, setLoginData] = useState(initialLoginData);


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setLoginData({ ...loginData, [name]: value });
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(loginData);
            const jsonData = JSON.stringify(loginData);
            const response = await axios.post(
                'http://localhost:3000/login',
                jsonData,
                {
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            );
      
            if (response.status === 200) {
                console.log('User succesfully logged in');
                // navigate("/home", 
                // navigate("/", 
                // {
                    // state: {
                    //     email: formData.email,
                    //     password: formData.password
                    // }
                // }));
                navigate('/')

            } else {
                console.error('Server error:', response.data);
            }
          } catch (error) {
            console.error('Network error:', error.message);
          }
    }

    return (
        <>
        <main>
            <h1 className="margin">Log in to your account:</h1>
                <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label><br></br>
                        <input className="box" type="text" id="email" name="email" value={loginData.email} onChange={handleInputChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password:</label><br></br>
                        <input className="box" type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange}/>
                    </div>
                    <button className="sign-up-form-button" type="submit">Submit</button>
                </form>
        </main>
        </>
    );
}

export default LogIn;