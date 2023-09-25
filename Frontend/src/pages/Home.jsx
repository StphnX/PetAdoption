import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import AnimalCard from "../components/AnimalCard";
import axios from "axios";
import { useState, useEffect } from "react";

function Home () {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        getPets();
      }, []);

      const getPets = async () => {

        try {
            const { data } = await axios.get('http://localhost:3000/allPets');
            setPets(data);
            // console.log(pets);

        } catch (error) {
            console.error('Error getting pets: ', error.message);
        }
        
      }

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const getRandomPets = () => {
        const shuffledPets = shuffleArray([...pets]);
    
        const shuff =  shuffledPets.slice(0, 4);
        // console.log(shuff);
        return shuff;

      }

    return (
        <>
            <Menu />
            <Header />

            <div className="companion-container">
            <h2>Meet Your Future Companion</h2>
                <div className="pics-container">
                {getRandomPets().map((animal, index)  => (
                   <AnimalCard key={index} pet={animal} />
               ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;