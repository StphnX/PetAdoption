import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function EditAdd () {
    const { id } = useParams();
    const { user } = useAuth();
    console.log(user);
    const navigate = useNavigate();
    const [fileData, setFileData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [images, setImages] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

      useEffect(() => {
       
        fetchPet(id);
     
      }, []);


    const fetchPet = async (id) => {
        try {
      
            const { data } = await axios.get(`http://localhost:3000/Pet/${id}`);
            setPetData(data);
    
            } catch (error) {
                console.error('Error getting pet: ', error.message);
            }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPetData({
            ...petData,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
  
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreview(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview(null);
        }
      };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // First, upload the image
            if (!fileData) {
              setErrorMessage("Please upload a picture");
              return;
            }
            const imageFormData = new FormData();
            imageFormData.append("image", fileData);
      
            const imageResponse = await axios.post(
              "http://localhost:3000/Pets/upload-image",
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
           
            const petResponse = await axios.put(
              `http://localhost:3000/Pets/${id}`,
              completeFormData,
              {
                withCredentials: true,
              }
            );
      
            if (petResponse.data) {
              console.log("Pet edited successfully:", petResponse.data);
              navigate(`/pets/${id}`);
            } else {
              console.error("Pet edition failed. Response:", petResponse);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Error editing pet: "+error);
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
                <h1 className="create-add-heading">Edit the pet ad:</h1>
                <form className="create-add-container" onSubmit={handleSubmit}>
                    <div>
                        <label>Name of the pet:</label>
                        <input
                            className="box"
                            type="text"
                            name="name"
                            value={petData.name}
                            defaultValue={petData.name}
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
                            value={petData.age}
                            defaultValue={petData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <input
                            className="box"
                            type="text"
                            name="gender"
                            value={petData.gender}
                            defaultValue={petData.gender}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Animal type:</label>
                        <input
                            className="box"
                            type="text"
                            name="animal_type"
                            value={petData.animal_type}
                            defaultValue={petData.animal_type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Health status:</label>
                        <input
                            className="box"
                            type="text"
                            name="health_status"
                            value={petData.health_status}
                            defaultValue={petData.health_status}
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
                            defaultValue={petData.description}
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
                            defaultValue={petData.address}
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
                            defaultValue={petData.zipcode}
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
                            accept="image/*" 
                            onChange={(event) => {
                                setFileData(event.target.files[0])
                                setImages(event.target.value)
                                handleImageChange(event)
                            }}
                            value={images}
                            />
                    </div>
                    {imagePreview ? (
                        <>
                        <div className="picture-preview-container">
                            <img src={imagePreview} alt={petData.name} />
                        </div>
                        </>
                        ) : ( 
                            <>
                        <div className="picture-preview-container">
                            <img src={petData.picture} alt={petData.name} />
                        </div>
                            <h2>Please select a file</h2>
                            </>
                        )}
                    <button className="button button-white" type="submit">Submit</button>
                </form>
            </div>
        </main>
        <Footer />
        </>
    );
}


export default EditAdd;