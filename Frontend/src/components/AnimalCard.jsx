import React from "react";
import animalImg from "../assets/cat.jpg";
import { NavLink } from "react-router-dom";

function AnimalCard ({pet}){

    console.log(pet);

    return (
        <>
            <figure className="animal-pic-container box">
                <img className="animal-pic" src={pet.picture} alt={pet.name} />
                <figcaption>{pet.name}</figcaption>
            </figure>
        </>
    );
}

export default AnimalCard;