import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from 'axios';

function SignUp () {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
      }

      
    const handleSubmit = async (event) => {
        event.preventDefault();
        
    try {
        const jsonData = JSON.stringify(formData);
        const response = await axios.post('http://localhost:3000/signup', jsonData);
  
        if (response.status === 200) {
            console.log('Data successfully submitted');
        } else {
            console.error('Server error:', response.data);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
       
    }

    return (
        <>
        <Menu />
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
                    <input type="text" id="username" name="username" value={formData.username} minLength="1" onChange={handleInputChange} />
                </div>
                {/* <div className="checkbox-container">
                    <div>
                        <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleInputChange} id="terms" required/>
                        <label htmlFor="html">I agree to terms</label><br></br>
                    </div>
                    <div>
                        <input type="checkbox" name="subscribeToNewsletter" id="newsletter" checked={formData.subscribeToNewsletter} onChange={handleInputChange} /> 
                        <label htmlFor="html">Subscribe to newsletter</label><br></br>
                    </div> 
                </div> */}
                <button className="sign-up-form-button" type="submit">Submit</button>
            </form>
        <Footer />
        </>
    );
}

export default SignUp;