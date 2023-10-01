import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

function PetDetails() {
    const { id } = useParams()
    const [pet, setPet] = useState(null)

    console.log(id)
    useEffect(() => {
        getPet()
    }, [])

    const getPet = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/Pet/${id}`);
            setPet(data);
            console.log(data);

        } catch (error) {
            console.error('Error getting pets: ', error.message);
        }
    }



    return (
        <>
        <Menu />
            {
                !pet ? <p>Loading..</p> :
                    <div className="pet-detail-container box">
                        <h1>{pet.name}</h1>
                        <ul className="pet-detail-list">
                            <li><img src={pet.picture} alt={pet.name} /></li>
                            <li>Type: {pet.animal_type}</li>
                            <li>Breed: {pet.breed}</li>
                            <li>Age: {pet.age}</li>
                            <li>Gender: {pet.gender}</li>
                            <li>Health status: {pet.health_status}</li>
                            <li>Located in: {pet.zipcode}</li>
                            <li><p>Description: {pet.description}</p></li>
                        </ul>
                        <NavLink className="button contact-button" to="/newmessage">Contact</NavLink>
                    </div>
            }
        </>

    );
}

export default PetDetails;