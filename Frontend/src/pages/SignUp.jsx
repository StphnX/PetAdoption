import React from "react";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function SignUp () {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        Username: ''
      });

      const [errorMessage, setErrorMessage] = useState("");

      const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
      }

      
    const handleSubmit = async (event) => {

        event.preventDefault();

        
        try {
            const jsonData = JSON.stringify(formData);
            const response = await axios.post(
                'http://localhost:3000/signup',
                jsonData,
                {
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            );
    
        if (response.status === 201) {
            console.log('Data successfully submitted');
            navigate("/login", 
            {
                state: {
                    email: formData.email,
                    password: formData.password
                }
            });

        } 
      } catch (error) {
        console.log(error);


        if (error.response.data.errors.email) {
            setErrorMessage(error.response.data.errors.email);
        } else if (error.response.data.errors.password) {
            setErrorMessage(error.response.data.errors.password);
        } else {
            setErrorMessage("An error occurred.");
        }
            
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        // console.error('Network error:', error.message);
        // setErrorMessage(error.response.data.errors.email);   
        }
        
    }

    return (
        <>
        <Menu />
        <main className="content">
            <div className="container">
                <h1 className="margin">Create an account:</h1>
                    <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label htmlFor="email">Email:</label><br></br>
                            <input className="box" type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="pass">Password:</label><br></br>
                            <input className="box" type="password" id="pass" name="password" value={formData.password} minLength="8" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="username">Username:</label><br></br>
                            <input className="box" type="text" id="username" name="Username" value={formData.Username} minLength="1" onChange={handleInputChange} />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <p className="link-to-login" >Already have an account? <NavLink className="underlined-link" to="/login">Log in instead</NavLink></p>
                        <button className="button-white button" type="submit">Submit</button>
                    </form>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default SignUp;