import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import { NavLink } from "react-router-dom";
import Menu from "../components/Menu";
import Footer from "../components/Footer";



function Pets() {

    const [pets, setPets] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState("");

    useEffect(() => {
        getPets();
      }, [filterCriteria]);

      const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
      };

      const getPets = async () => {

        try {
            let url = 'https://mern-pet-adoption.onrender.com/allPets';

            if (filterCriteria) {
              url = `https://mern-pet-adoption.onrender.com/Pets/${filterCriteria}`;
              console.log(filterCriteria);
            }
        
            const { data } = await axios.get(url);
            setPets(data);
            console.log(pets);

        } catch (error) {
            console.error('Error getting pets: ', error.message);
        }
        
      }

    return (
        <>
        <Menu />
        <main className="content">
        <div className="pet-selection-container">
            <h2>Select pet type:</h2>
            <select className="box criteria-select" onChange={handleFilterChange}>
                <option value="">All Pets</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
            </select>
        </div>
           {!filterCriteria ? <h1 className="pets-page-heading">Pets currently looking for a new home:</h1> : <h1 className="pets-page-heading to-uppercase">{filterCriteria}s currently looking for a new home:</h1>}
                <div className="animal-card-container">
                    {pets.map((pet, index) => (
                        <NavLink key={index} to={`/pets/${pet._id}`}>
                            <AnimalCard pet={pet}/>
                        </NavLink>
                    ))}
                </div>
        </main>
        <Footer />
        </>
    );
}

export default Pets;