import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import AnimalCard from "../components/AnimalCard";
import catImg from "../assets/cat.jpg";
import dogImg from "../assets/dog.jpg";
import rabbitImg from "../assets/rabbit.jpg";
import otherDogImg from "../assets/dog2.jpg";

function Home () {

    const animalPics = [catImg, dogImg, rabbitImg, otherDogImg];

    return (
        <>
            <Menu />
            <Header />
            <div className="companion-container">
            <h2>Meet Your Future Companion</h2>
                <div className="pics-container">
                   {animalPics.map((animalPic, index) => (
                   <AnimalCard key={index} animal={animalPic} />
                   ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;