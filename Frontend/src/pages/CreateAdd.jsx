import React from "react";
import axios from "axios";
import { useState } from "react";

// import {Cloudinary} from "@cloudinary/url-gen";

function CreateAdd () {

    // const [selectedOption, setSelectedOption] = useState("");

    const [fileData, setFileData] = useState(null);

    // const [petData, setPetData] = useState({
    //     name: '',
    //     age: 0,
    //     gender: '',
    //     animal_type: '',
    //     breed: '',
    //     health_status: '',
    //     address: '',
    //     zipcode: '',
    //     picture: '',
    //     description: ''
    //   });


      const instance = axios.create({
        withCredentials: true
      });


    // const uploadImge = () => {
    //     const imageFile = {
    //         file: fileData,
    //         uploadPreset: "cpguecae"
    //     }

    //     axios.post(
    //         "https://api.cloudinary.com/v1_1/duanxtte9/image/upload",
    //          imageFile
    //          ).then((response) => {
    //             console.log(response);
    //          });

    // }

    // const handleImageUpload = (event) => {

    //     if(file) {
    //         const cld = new Cloudinary({cloud: {cloudName: 'duanxtte9'}});
            
    //     }

    // }


    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;


    //     setFormData({ ...formData, [name]: value });
    //   }

    // const handleOptionChange = (event) => {
    //     const { value } = event.target.value;
    //     setFormData({ ...formData, gender: value });
    //   };
      
    // const handleSubmit = async (event) => {

    //     event.preventDefault();

        const uploadImage = async () => {

            if (!fileData) {
                console.error("No file selected");
                return;
              }

            const formData = new FormData();
            formData.append("file", fileData);
            formData.append("upload_preset", "petImage");

            try{

                const response = await instance.post(
                    "https://api.cloudinary.com/v1_1/duanxtte9/image/upload",
                     formData
                     );

                if (response.data && response.data.secure_url) {
                    const imageURL = response.data.secure_url;
                    console.log("Image uploaded successfully. URL:", imageURL);
                } else {
                    console.error("Image upload failed. Response:", response);
                }

            } catch (error) {
            console.error("Error uploading image:", error.message);
            }
           
        
    //     try {
        }
        
    //         }
    //         const jsonData = JSON.stringify(formData);
    //         const response = await axios.post(
    //             'http://localhost:3000/Pets/create',
    //             jsonData,
    //             {
    //                 headers:{
    //                     "Content-Type": "application/json"
    //                 }
    //             }
    //         );
    
    //     if (response.status === 201) {
    //         console.log('Data successfully submitted');
    //         navigate("/");

    //     } 
    //   } catch (error) {
    //     console.error('Network error:', error.message);
    //     alert('Failed to create pet entry');

    //     }
    // }

    return (
        <div>
        {/* <h1 className="margin">Create an add for your pet:</h1> */}
        {/* <form onSubmit={handleSubmit} className="create-add-form"> */}
            {/* <label htmlFor="petName">Name of your pet:</label>
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
            <textarea className="box" name="description" id="description" cols="30" rows="10" onChange={handleInputChange}></textarea> */}
            <input type="file" accept="image/*" onChange={(event) => {
                setFileData(event.target.files[0]);
            }} />
            <button onClick={uploadImage}>Submit</button>
        {/* </form> */}
        </div>
    );
}


export default CreateAdd;