import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import AnimalCard from "../components/AnimalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import headerImage from "../assets/header-img-small.jpg";

function Home () {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        getPets();
      }, []);

      const getPets = async () => {

        try {
            const { data } = await axios.get('https://mern-pet-adoption.onrender.com/allPets');
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
            <main className="content">
              <div className="header-container">
                  <div className="header-text-container">
                      <h1>Find Loving Homes for Pets, or Open Your Heart to Adopt - Welcome to Adoptly!</h1>
                      <p>Join our community of animal lovers and make a difference in the lives of pets. Whether you're looking for a new best friend or seeking a loving home for your pet, Adoptly is here to connect hearts and paws. Start your journey today and be a part of something special.</p>
                      <NavLink className="button cta-button button-orange" to="/signup">Get started</NavLink>
                  </div>
                  <img id="header-img" src={headerImage} alt="" />
              </div>
              <div className="companion-container">
              <h2>Meet Your Future Companion</h2>
                  <div className="pics-container">
                  {getRandomPets().map((animal, index)  => (
                  <NavLink key={index} to={`/pets/${animal._id}`}>
                      <AnimalCard key={index} pet={animal}/>
                  </NavLink>
                ))}
                  </div>
              </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;