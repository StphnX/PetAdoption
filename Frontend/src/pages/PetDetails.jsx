import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

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
            {
                !pet ? <p>Loading..</p> :
                    <div className="pet-detail-container box">
                        <h1>Pets name</h1>
                        <ul className="pet-detail-list">
                            {/* TO DO this details need to be populated */}
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
            }
        </>

    );
}

export default PetDetails;