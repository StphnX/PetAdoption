import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function CreateAdd () {
    const { user } = useAuth();
    console.log(user);
    const navigate = useNavigate();
    const [fileData, setFileData] = useState(null);
    const [images, setImages] = useState("");
    const [petData, setPetData] = useState({
        name: '',
        age: 0,
        gender: '',
        animal_type: '',
        health_status: '',
        address: '',
        zipcode: '',
        picture: '',
        description: '',
        owner: user.user_id
      });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPetData({
            ...petData,
            [name]: value
        })
    }

    const handleFileChange = (event) => {
        setFileData(event.target.files[0]);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // First, upload the image
            if (!fileData) {
              console.error("No file selected");
              return;
            }
      
            const imageFormData = new FormData();
            imageFormData.append("image", fileData);
      
            const imageResponse = await axios.post(
              "https://mern-pet-adoption.onrender.com/Pets/upload-image",
              imageFormData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
      
            if (!imageResponse.data || !imageResponse.data.imageUrl) {
              console.error("Image upload failed. Response:", imageResponse);
              return;
            }
      
            // After successfully uploading the image, use the returned imageUrl
            // in the formData to create the pet
            const completeFormData = {
              ...petData,
              picture: imageResponse.data.imageUrl,
            };
      
            const petResponse = await axios.post(
              "https://mern-pet-adoption.onrender.com/Pets/create",
              completeFormData,
              {
                withCredentials: true,
              }
            );
      
            if (petResponse.data) {
              console.log("Pet created successfully:", petResponse.data);
              navigate("/pets/"+petResponse.data.data._id)
            } else {
              console.error("Pet creation failed. Response:", petResponse);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Error creating pet: "+error);
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
          }
    }
  
    return (
        <>
        <Menu />
        <main className="content">
            <div>
                <h1 className="create-add-heading">Create an add for your pet</h1>
                <form className="create-add-container" onSubmit={handleSubmit}>
                    <div>
                        <label>Name of the pet:</label>
                        <input
                            className="box"
                            type="text"
                            name="name"
                            value={petData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            className="box"
                            type="number"
                            name="age"
                            value={petData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select className="box" onChange={handleChange} value={petData.gender} name="gender" required>
                            <option value="" selected disabled>select gender</option>
                            <option value="female">female</option>
                            <option value="male">male</option>
                        </select>
                    </div>
                    <div>
                        <label>Animal type:</label>
                        <select className="box" onChange={handleChange} value={petData.animal_type} name="animal_type" required>
                            <option value="" selected disabled>select type</option>
                            <option value="dog">dog</option>
                            <option value="cat">cat</option>
                        </select>
                    </div>
                    <div>
                        <label>Health status:</label>
                        <input
                            className="box"
                            type="text"
                            name="health_status"
                            value={petData.health_status}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            className="box"
                            name="description"
                            value={petData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Street name and number:</label>
                        <input
                            className="box"
                            type="tex"
                            name="address"
                            value={petData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Postal code and City:</label>
                        <input
                            className="box"
                            type="text"
                            name="zipcode"
                            value={petData.zipcode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="hidden"
                            name="userId"
                            value={user.user_id}
                        />
                    </div>
                    <div>
                    <label>Upload a picture:</label>
                        <input 
                            type="file"
                            className="button button-white"
                            accept="image/*" 
                            onChange={(event) => {
                                setFileData(event.target.files[0])
                                setImages(event.target.value)
                            }}
                            value={images}
                            />
                    </div>
                    {/* <button onClick={uploadImage}>Submit</button> */}
                    <button className="button button-white" type="submit">Submit</button>
                </form>
            </div>
        </main>
        <Footer />
        </>
    );
}


export default CreateAdd;