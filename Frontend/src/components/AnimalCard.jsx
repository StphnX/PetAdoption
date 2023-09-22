import React from "react";
import animalImg from "../assets/cat.jpg";

function AnimalCard ({pet}){

    return (
        <>
            <figure className="animal-pic-container">
                <img className="animal-pic" src={pet.picture} alt={pet.name} />
            </figure>
        </>
    );
}

export default AnimalCard;