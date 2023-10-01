import React from "react";
import MenuIcon from "./MenuIcon";
import SignUp from "../pages/SignUp";
import { NavLink } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import LogIn from "../pages/LogIn";
import { Cookies, useCookies } from 'react-cookie';
import { useState } from "react";
import LogOut from "./LogOut";
import { useAuth } from '../context/AuthContext';



function Menu() {

    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const { user } = useAuth();

    // const handleLogout = () => {
    //     removeCookie('jwt',{path:'/'});
    //   };

    return (
            <nav className="header-menu-bar">
                <ul className="menu-links-container">
                    <li><NavLink to="/about">about</NavLink></li>
                    <li><NavLink  to="/">home</NavLink></li>
                {user ? ( 
                    <>
                    <li><NavLink  to="/messages">messages</NavLink></li>
                    <li><NavLink  to="/profile">profile</NavLink></li>
                    <li><NavLink  to="/pets">pets</NavLink></li>
                    <li><NavLink  to="/createadd">create an add</NavLink></li>
                    <LogOut />
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