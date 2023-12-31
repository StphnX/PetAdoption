import React from "react";
import { useAuth } from '../context/AuthContext';
import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import defaultprofile from "../assets/default-profile.jpg";
import AnimalCard from "../components/AnimalCard";
import { NavLink } from "react-router-dom";

function UserProfile () {
    const { user, logout } = useAuth();
    const [pets, setPets] = useState([]);

    useEffect(() => {

        fetchPets();

    }, []);

    const handleDelete = async (petId) => {

        const updatedPets = pets.filter((pet) => pet._id !== petId);
        setPets(updatedPets);

        try {

            const response = await axios.delete(`https://mern-pet-adoption.onrender.com/Pets/${petId}`);

            if (response.status === 200) {
                console.log(response.data);
            }
            else {
                console.log("Pet couldnt get deleted");
            }

        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchPets = async () => {
        try {

          const response = await axios.get(`https://mern-pet-adoption.onrender.com/allPets/${user.user_id}`);

          if (response.status === 200) {
              console.log(response.data);
              setPets(response.data);
              console.log(pets);
          }
          else {
              console.log("No pets found");
          }

        } catch (error) {
          console.error('Error fetching data:', error);
              if (error.response && error.response === 404) {
                  console.log("no pets found");
              }
          };
      }


    return (
        <>
            <Menu />
            <main className="content">
                <div className="user-profile-container">
                    <img className="user-profile-picture" src={defaultprofile} alt="profile picture of the user" />
                    <div className="profile-info-container">
                        <h1 className="profile-page-heading">Hello, {user.username}!</h1>
                        <h2>Your profile information:</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
                <h2>Your ads:</h2>
                <div className="pet-ads-container">
                        {pets.map((singlePet, index) => (
                            <div>
                                <NavLink key={index} to={`/pets/${singlePet._id}`}>
                                    <AnimalCard key={index} pet={singlePet}/>
                                </NavLink>
                                <button onClick={() => handleDelete(singlePet._id)} className="button button-white">Delete</button>
                                <NavLink className="button button-white" key={index} to={`/editadd/${singlePet._id}`}>Edit</NavLink>
                            </div>
                        ))}
                    </div>
            </main>
            <Footer />
        </>

    );
}

export default UserProfile;