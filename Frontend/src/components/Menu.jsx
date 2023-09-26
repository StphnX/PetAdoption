import React from "react";
import MenuIcon from "./MenuIcon";
import SignUp from "../pages/SignUp";
import { NavLink } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import LogIn from "../pages/LogIn";
import { Cookies, useCookies } from 'react-cookie';



function Menu() {
    const [cookies, setCookie] = useCookies(["jwt"]);

    console.log(cookies.jwt)

    return (
        <>
            <nav className="header-menu-bar">
                <ul className="menu-links-container">
                    <li>
                        <NavLink to="/">home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">about</NavLink>
                    </li>
                </ul>
                <div className="log-in-container">
                    <NavLink className="button sign-up" to="/signup">Sign up</NavLink>
                     <NavLink className="button log-in" to="/login">Log in</NavLink>
                    <p>Adoptly Logo</p>
                </div>
            </nav>
        </>
    );
}

export default Menu;