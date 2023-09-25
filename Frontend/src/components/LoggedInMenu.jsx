import React from "react";
import { NavLink } from "react-router-dom";

function LoggedInMenu (){
    return(
        <>
            <nav>
                <ul>
                    <li><NavLink  to="/home">home</NavLink></li>
                    <li><NavLink  to="/messages">messages</NavLink></li>
                    <li><NavLink  to="/profile">profile</NavLink></li>
                    <li><NavLink  to="/pets">pets</NavLink></li>
                    <li><NavLink  to="/createadd">create an add</NavLink></li>
                </ul>
            </nav>
        </>
    );
}

export default LoggedInMenu;