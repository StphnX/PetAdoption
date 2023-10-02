import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

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
        <main className="content">
            {
                !pet ? <p>Loading..</p> :
                <>
                <div className="pet-detail-container">
                    <div className="pet-picture-container box">
                        <img src={pet.picture} alt={pet.name} />
                        <h1>{pet.name}</h1>
                    </div>
                    <div className="pet-info-container">
                        <ul className="pet-detail-list box">
                            <li><span className="pet-detail">Type:</span> {pet.animal_type}</li>
                            <li><span className="pet-detail">Breed:</span> {pet.breed}</li>
                            <li><span className="pet-detail">Age:</span> {pet.age}</li>
                            <li><span className="pet-detail">Gender:</span> {pet.gender}</li>
                            <li><span className="pet-detail">Health:</span> {pet.health_status}</li>
                            <li><span className="pet-detail">Located in:</span> {pet.zipcode}</li>
                            <li><span className="pet-detail">Description:</span> {pet.description}</li>
                            <NavLink className="button button-orange contact-owner-button" to="/messages">Contact the owner</NavLink>
                        </ul>   
                    </div>
                </div>  
                </>
            }
        </main>
        <Footer />
        </>

    );
}

export default PetDetails;