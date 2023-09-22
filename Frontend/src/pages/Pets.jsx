import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";

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
            <h1>Pets that are currently looking for a new home:</h1>
            <div className="animal-card-container">
                {pets.map((pet) => <AnimalCard pet={pet}/>)}
            </div>
        </>
    );
}

export default Pets;