import React from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from '../context/AuthContext';
import Footer from "../components/Footer";
import Menu from "../components/Menu";



function LogIn () {

    const { login, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [, setCookie] = useCookies(["jwt"]);
    
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
                // setCookie("jwt", token, { path: "/" });

                 // Call the login function to set the user data in the context:
                 const userData = response.data;
                 console.log(userData);
                 login(userData);
                 console.log(user);
                 console.log(userData);

                navigate('/');

            } else {
                console.error('Server error:', response.data);
            }
          } catch (error) {

            if (error.response.data.errors.email) {
                setErrorMessage(error.response.data.errors.email);
            } else if (error.response.data.errors.password) {
                setErrorMessage(error.response.data.errors.password);
            } else {
                setErrorMessage("An error occurred.");
            }
          }
    }

    return (
        <>
        <Menu />
        <main className="content">
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
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <p className="link-to-login" >Don't have an account yet? <NavLink className="underlined-link" to="/signup">Sign up instead</NavLink></p>
                    <button className="button button-white" type="submit">Submit</button>
                </form>
                
        </main>
        <Footer />

        </>
    );
}

export default LogIn;