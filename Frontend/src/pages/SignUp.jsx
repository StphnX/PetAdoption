import React from "react";
import { useState } from "react";
import axios from 'axios';

function SignUp () {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        Username: ''
      });

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
            // use useNavigate to navigate to the login page and fill out the information with the email and password from the current user that allready created an account succesfully
        } else {
            console.error('Server error:', response.data);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
       
    }

    return (
        <>
        <h1 className="margin">Create an account:</h1>
            <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="email">Email:</label><br></br>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="pass">Password:</label><br></br>
                    <input type="password" id="pass" name="password" value={formData.password} minLength="8" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="username">Username:</label><br></br>
                    <input type="text" id="username" name="Username" value={formData.Username} minLength="1" onChange={handleInputChange} />
                </div>
                <button className="sign-up-form-button" type="submit">Submit</button>
            </form>
        </>
    );
}

export default SignUp;