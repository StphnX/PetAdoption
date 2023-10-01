import React from "react";
import { useAuth } from '../context/AuthContext';
import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile () {
    const { user, logout } = useAuth();
    const [pets, setPets] = useState(null);
    console.log(user);

    useEffect(() => {

        const fetchPets = async () => {
          try {

            const response = await axios.get('http://localhost:3000/getPetsByOwner');

            if (response.status === 201) {
                console.log('Data successfully submitted');
                navigate("/login", 
                {
                    state: {
                        email: formData.email,
                        password: formData.password
                    }
                });
    

            setPets(result);
            }

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <>
            <Menu />
            <div className="user-profile-container box">
                <h1>Hello, {user.user}</h1>

            </div>
        </>

    );
}

export default UserProfile;