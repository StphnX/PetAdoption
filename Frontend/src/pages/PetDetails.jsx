import React from "react";
import { NavLink } from "react-router-dom";

function PetDetails () {

    return (
        <>
            <div className="pet-detail-container box">
                <h1>Pets name</h1>
                <ul className="pet-detail-list">
                    <li>pet image</li>
                    <li>Type:</li>
                    <li>Breed:</li>
                    <li>Age:</li>
                    <li>Gender:</li>
                    <li>Health status:</li>
                    <li>Located in:</li>
                    <li><p>Description:</p></li>
                </ul>
                <NavLink className="button contact-button" to="/newmessage">Contact</NavLink>
            </div>
        </>

    );
}

export default PetDetails;