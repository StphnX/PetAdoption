import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";

// import {Cloudinary} from "@cloudinary/url-gen";

function CreateAdd () {
    const [fileData, setFileData] = useState(null);
    const [images, setImages] = useState("");
    const [petData, setPetData] = useState({
        name: '',
        age: 0,
        gender: '',
        animal_type: '',
        // breed: '',
        health_status: '',
        address: '',
        zipcode: '',
        picture: 'here',
        description: ''
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

    // const uploadImage = async () => {
    //     if (!fileData) {
    //         console.error("No file selected");
    //         return;
    //         }

    //     const formdata = new FormData();
    //     formdata.append("image", fileData);
    //     // formdata.append("upload_preset", "petImage");

    //     try{
    //         console.log(fileData)
    //         console.log(formdata)
    //         const response = await axios.post(
    //             "http://localhost:3000/Pets/create",
    //                 formdata, 
    //                 {
    //                 withCredentials: true,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //                 }
    //                 );
    //         console.log(response)
    //         if (response.data) {
    //             console.log(response.data);
    //         } else {
    //             console.error("Image upload failed. Response:", response);
    //         }

    //     } catch (error) {
    //         // https://axios-http.com/docs/handling_errors
    //     console.error("Error uploading image:", error.message);
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //         } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log(error.request);
    //         } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //     }
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // First, upload the image
    //         if (!fileData) {
    //           console.error("No file selected");
    //           return;
    //         }
      
    //         const imageFormData = new FormData();
    //         imageFormData.append("image", fileData);
      
    //         const imageResponse = await axios.post(
    //           "http://localhost:3000/Pets/upload-image",
    //           imageFormData,
    //           {
    //             withCredentials: true,
    //             headers: {
    //               "Content-Type": "multipart/form-data",
    //             },
    //           }
    //         );
      
    //         if (!imageResponse.data || !imageResponse.data.imageUrl) {
    //           console.error("Image upload failed. Response:", imageResponse);
    //           return;
    //         }
      
    //         // After successfully uploading the image, use the returned imageUrl
    //         // in the formData to create the pet
    //         const completeFormData = {
    //           ...formData,
    //           picture: imageResponse.data.imageUrl,
    //         };
      
    //         const petResponse = await axios.post(
    //           "http://localhost:3000/Pets/create",
    //           completeFormData,
    //           {
    //             withCredentials: true,
    //           }
    //         );
      
    //         if (petResponse.data) {
    //           console.log("Pet created successfully:", petResponse.data);
    //           // Redirect or perform other actions after successful pet creation
    //         } else {
    //           console.error("Pet creation failed. Response:", petResponse);
    //         }
    //       } catch (error) {
    //         console.error("Error:", error);
    //         // Handle errors as needed
    //       }


    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Create a FormData object for the entire form
          const formData = new FormData();
    
          // Append the image file to the FormData
          if (fileData) {
            formData.append("image", fileData);
          }
    
          // Append the pet data fields to the FormData
          for (const key in petData) {
            formData.append(key, petData[key]);
          }
    
          // Make a single Axios POST request to upload the image and submit form data
          const response = await axios.post("http://localhost:3000/Pets/create", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          if (response.data) {
            console.log("Pet created successfully:", response.data);
            // Redirect or perform other actions after successful pet creation
          } else {
            console.error("Pet creation failed. Response:", response);
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle errors as needed
        }
      };
        
    return (
        <div>
            <h2>Create New Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
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
                        type="number"
                        name="age"
                        value={petData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={petData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Animal Type:</label>
                    <input
                        type="text"
                        name="animal_type"
                        value={petData.animal_type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>health_status:</label>
                    <input
                        type="text"
                        name="health_status"
                        value={petData.health_status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>address:</label>
                    <input
                        type="text"
                        name="address"
                        value={petData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>zipcode:</label>
                    <input
                        type="text"
                        name="zipcode"
                        value={petData.zipcode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>description:</label>
                    <input
                        type="text"
                        name="description"
                        value={petData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input 
                    type="file"
                    accept="image/*" 
                    onChange={(event) => {
                        setFileData(event.target.files[0])
                        setImages(event.target.value)
                    }}
                    value={images}
                    />
                {/* <button onClick={uploadImage}>Submit</button> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default CreateAdd;
// function CreateAdd () {

//     // const [selectedOption, setSelectedOption] = useState("");

//     const [fileData, setFileData] = useState(null);

//     // const [petData, setPetData] = useState({
//     //     name: '',
//     //     age: 0,
//     //     gender: '',
//     //     animal_type: '',
//     //     breed: '',
//     //     health_status: '',
//     //     address: '',
//     //     zipcode: '',
//     //     picture: '',
//     //     description: ''
//     //   });


//     //   const instance = axios.create({
//     //     withCredentials: true
//     //   });


//     // const uploadImge = () => {
//     //     const imageFile = {
//     //         file: fileData,
//     //         uploadPreset: "cpguecae"
//     //     }

//     //     axios.post(
//     //         "https://api.cloudinary.com/v1_1/duanxtte9/image/upload",
//     //          imageFile
//     //          ).then((response) => {
//     //             console.log(response);
//     //          });

//     // }

//     // const handleImageUpload = (event) => {

//     //     if(file) {
//     //         const cld = new Cloudinary({cloud: {cloudName: 'duanxtte9'}});
            
//     //     }

//     // }


//     // const handleInputChange = (event) => {
//     //     const { name, value } = event.target;


//     //     setFormData({ ...formData, [name]: value });
//     //   }

//     // const handleOptionChange = (event) => {
//     //     const { value } = event.target.value;
//     //     setFormData({ ...formData, gender: value });
//     //   };
      
//     // const handleSubmit = async (event) => {

//     //     event.preventDefault();

//         const uploadImage = async () => {

//             if (!fileData) {
//                 console.error("No file selected");
//                 return;
//               }

//             const formData = new FormData();
//             formData.append("file", fileData);
//             formData.append("upload_preset", "petImage");

//             try{

//                 const response = await axios.post(
//                     "https://api.cloudinary.com/v1_1/duanxtte9/image/upload",
//                      formData
//                      );

//                 if (response.data && response.data.secure_url) {
//                     const imageURL = response.data.secure_url;
//                     console.log("Image uploaded successfully. URL:", imageURL);
//                 } else {
//                     console.error("Image upload failed. Response:", response);
//                 }

//             } catch (error) {
//             console.error("Error uploading image:", error.message);
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.log(error.response.data);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//               } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 console.log(error.request);
//               } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message);
//               }
//               console.log(error.config);
//             }
           
        
//     //     try {
//         }
        
//     //         }
//     //         const jsonData = JSON.stringify(formData);
//     //         const response = await axios.post(
//     //             'http://localhost:3000/Pets/create',
//     //             jsonData,
//     //             {
//     //                 headers:{
//     //                     "Content-Type": "application/json"
//     //                 }
//     //             }
//     //         );
    
//     //     if (response.status === 201) {
//     //         console.log('Data successfully submitted');
//     //         navigate("/");

//     //     } 
//     //   } catch (error) {
//     //     console.error('Network error:', error.message);
//     //     alert('Failed to create pet entry');

//     //     }
//     // }

//     return (
//         <div>
//         {/* <h1 className="margin">Create an add for your pet:</h1> */}
//         {/* <form onSubmit={handleSubmit} className="create-add-form"> */}
//             {/* <label htmlFor="petName">Name of your pet:</label>
//             <input className="box" type="text" id="petName" name="name" onChange={handleInputChange} />
//             <label htmlFor="petName">Age of your pet:</label>
//             <input className="box" type="text" id="petAge" name="age" onChange={handleInputChange} />
//             <label htmlFor="healthStatus">Health status:</label>
//             <input className="box" type="text" id="healthStatus" name="health_status" onChange={handleInputChange}/>
//             <label htmlFor="type">Type of pet:</label>
//             <input className="box" type="text" id="type" name="animal_type" onChange={handleInputChange}/>
//             <label htmlFor="breed">Breed:</label>
//             <input className="box" type="text" id="breed" name="breed" onChange={handleInputChange}/>
//             <label htmlFor="breed">Street name and number :</label>
//             <input className="box" type="text" id="breed" name="address" onChange={handleInputChange}/>
//             <label htmlFor="breed">Postcode and City:</label>
//             <input className="box" type="text" id="breed" name="zipcode" onChange={handleInputChange}/>
//             <legend>Gender:</legend>
//             <select value={selectedOption} onChange={handleOptionChange}>
//                 <option value="female">Female</option>
//                 <option value="male">Male</option>
//             </select>
//             <label htmlFor="desctiption">Description:</label>
//             <textarea className="box" name="description" id="description" cols="30" rows="10" onChange={handleInputChange}></textarea> */}
//             <input type="file" accept="image/*" onChange={(event) => {
//                 setFileData(event.target.files[0]);
//             }} />
//             <button onClick={uploadImage}>Submit</button>
//         {/* </form> */}
//         </div>
//     );
// }


// export default CreateAdd;