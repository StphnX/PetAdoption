import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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


        if (error.response.data.errors.email) {
            setErrorMessage(error.response.data.errors.email);
        } else if (error.response.data.errors.password) {
            setErrorMessage(error.response.data.errors.password);
        } else {
            setErrorMessage("An error occurred.");
        }
            

        // console.error('Network error:', error.message);
        // setErrorMessage(error.response.data.errors.email);   
        }
    }

    return (
        <>
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
                <button className="sign-up-form-button" type="submit">Submit</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
    );
}

export default SignUp;