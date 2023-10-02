import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function About () {

    return (
        <>
        <Menu />
        <main className="content">
            <div className="about-page-container">
                <h1>Welcome to ClearTheShelter!</h1>
                <p>
                A heartfelt initiative born out of a shared passion for animal welfare. Our web app, created by Susanna and Stephan during our web development bootcamp, aims to reshape the way we connect loving pet owners with compassionate individuals seeking to adopt furry companions.
                </p>
                <h2>The Inspiration Behind ClearTheShelters</h2>
                <p>Stephan, drawing from his personal experience working in an animal shelter, witnessed the overcrowding and the plight of countless animals searching for their forever homes. It was during this time that he recognized the need for a more direct and efficient way to facilitate pet adoptions. Thus, the concept of ClearTheShelter was born. ClearTheShelter is designed as a compassionate alternative to traditional animal shelters. It provides a platform where pet owners can connect with potential adopters directly, eliminating the need for animals to pass through the often stressful shelter environment.</p>
                <h2>How It Works</h2>
                <p>Upon registration, users can create listings for pets they wish to put up for adoption. These listings include all the essential details about the pet, from breed and age to personality traits and special requirements.</p>
                <p>For those looking to adopt, ClearTheShelter offers a user-friendly browsing experience. You can search for pets based on your preferences, and when you find a furry friend that tugs at your heartstrings, simply contact the owner. Our built-in chat functionality allows you to communicate with the pet owner, ask questions, and make arrangements for visiting and getting to know your potential new family member.</p>
                <h2>Why Choose ClearTheShelter</h2>
                <p>What truly matters is not where you find your new friend, it's about the love and care you provide. ClearTheShelter is here to make that connection easier, creating happier homes for pets and pet owners alike. Join us in our mission to bring joy to the lives of pets and their new families. Together, we can make a positive difference in the world of animal adoption.</p>
            </div>    
        </main>
        <Footer />
        </>
    );
}

export default About;