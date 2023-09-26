import React from "react";
import axios from "axios";
import { useState } from "react";

function CreateAdd () {

    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        gender: '',
        animal_type: '',
        breed: '',
        health_status: '',
        address: '',
        zipcode: '',
        picture: '',
        description: ''
      });

      const [selectedOption, setSelectedOption] = useState("");


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
      }

    const handleOptionChange = (event) => {
        const { value } = event.target.value;
        setFormData({ ...formData, gender: value });
      };
      
    const handleSubmit = async (event) => {

        event.preventDefault();

        
        try {
            const jsonData = JSON.stringify(formData);
            const response = await axios.post(
                'http://localhost:3000/Pets/create',
                jsonData,
                {
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            );
    
        if (response.status === 201) {
            console.log('Data successfully submitted');
            navigate("/");

        } 
      } catch (error) {
        console.error('Network error:', error.message);
        alert('Failed to create pet entry');

        }
    }

    return (
        <>
        <h1 className="margin">Create an add for your pet:</h1>
        <form onSubmit={handleSubmit} className="create-add-form">
            <label htmlFor="petName">Name of your pet:</label>
            <input className="box" type="text" id="petName" name="name" onChange={handleInputChange} />
            <label htmlFor="petName">Age of your pet:</label>
            <input className="box" type="text" id="petAge" name="age" onChange={handleInputChange} />
            <label htmlFor="healthStatus">Health status:</label>
            <input className="box" type="text" id="healthStatus" name="health_status" onChange={handleInputChange}/>
            <label htmlFor="type">Type of pet:</label>
            <input className="box" type="text" id="type" name="animal_type" onChange={handleInputChange}/>
            <label htmlFor="breed">Breed:</label>
            <input className="box" type="text" id="breed" name="breed" onChange={handleInputChange}/>
            <label htmlFor="breed">Street name and number :</label>
            <input className="box" type="text" id="breed" name="address" onChange={handleInputChange}/>
            <label htmlFor="breed">Postcode and City:</label>
            <input className="box" type="text" id="breed" name="zipcode" onChange={handleInputChange}/>
            <legend>Gender:</legend>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select>
            <label htmlFor="desctiption">Description:</label>
            <textarea className="box" name="description" id="description" cols="30" rows="10" onChange={handleInputChange}></textarea>
            <input type="file" accept="image/*" onChange={handleInputChange} />
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default CreateAdd;