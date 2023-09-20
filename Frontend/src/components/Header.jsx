import React from "react";
import headerImage from "../assets/header-img-small.jpg";
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <>
            <div className="header-container">
                <div className="header-text-container">
                    <h1>Find Loving Homes for Pets, or Open Your Heart to Adopt - Welcome to Adoptly!</h1>
                    <p>Join our community of animal lovers and make a difference in the lives of pets. Whether you're looking for a new best friend or seeking a loving home for your pet, Adoptly is here to connect hearts and paws. Start your journey today and be a part of something special.</p>
                    <NavLink className="button cta-button" to="/signup">Get started</NavLink>
                </div>
                <img id="header-img" src={headerImage} alt="" />
            </div>
        </>
    );
    
}

export default Header;