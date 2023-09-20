import React from "react";
import animalImg from "../assets/cat.jpg";

function AnimalCard ({animal}){

    return (
        <>
            <figure className="animal-pic-container">
                <img className="animal-pic" src={animal} alt="" />
            </figure>
        </>
    );
}

export default AnimalCard;