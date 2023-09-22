import React from "react";
import animalImg from "../assets/cat.jpg";

function AnimalCard ({pet}){

    return (
        <>
            <figure className="animal-pic-container">
                <img className="animal-pic" src={pet.picture} alt={pet.name} />
                <h2>{pet.name}</h2>
            </figure>
        </>
    );
}

export default AnimalCard;