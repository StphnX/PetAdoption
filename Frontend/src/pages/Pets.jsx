import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import { NavLink } from "react-router-dom";

function Pets() {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        getPets();
      }, []);

      const getPets = async () => {

        try {
            const { data } = await axios.get('http://localhost:3000/allPets');
            setPets(data);
            console.log(pets);

        } catch (error) {
            console.error('Error getting pets: ', error.message);
        }
        
      }

    return (
        <>
            <h1 className="pets-page-heading">Pets currently looking for a new home:</h1>
            <div className="animal-card-container">
                {pets.map((pet, index) => (
                    <NavLink key={index} to={`/pets/${pet.name}`}>
                        <AnimalCard pet={pet}/>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default Pets;