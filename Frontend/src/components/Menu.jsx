import React from "react";
import MenuIcon from "./MenuIcon";
import SignUp from "../pages/SignUp";
import { NavLink } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import LogIn from "../pages/LogIn";
import { Cookies, useCookies } from 'react-cookie';
import { useState } from "react";



function Menu() {

    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

    const handleLogout = () => {
        removeCookie('jwt',{path:'/'});
      };

    return (
            <nav className="header-menu-bar">
                <ul className="menu-links-container">
                    <li><NavLink to="/about">about</NavLink></li>
                {cookies.jwt ? ( 
                    <>
                    <li><NavLink  to="/home">home</NavLink></li>
                    <li><NavLink  to="/messages">messages</NavLink></li>
                    <li><NavLink  to="/profile">profile</NavLink></li>
                    <li><NavLink  to="/pets">pets</NavLink></li>
                    <li><NavLink  to="/createadd">create an add</NavLink></li>
                    <button className="button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                <div className="log-in-container">
                    <NavLink className="button sign-up" to="/signup">Sign up</NavLink>
                     <NavLink className="button log-in" to="/login" cookie={cookies}>Log in</NavLink>
                    <p>Adoptly Logo</p>
                </div>
                )}
                </ul>
            </nav>
    );
}

export default Menu;