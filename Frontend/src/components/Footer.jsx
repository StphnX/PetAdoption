import React from "react";
import GithubIcon from "./GithubIcon";
import FacebookIcon from "./FacebookIcon";
import InstagramIcon from "./InstagramIcon";

function Footer (){

    return (
        <>
        <footer>
            <div className="footer-content-container">
                <p>Copyright © {new Date().getFullYear()} CleaTheShelters</p>
                <div className="footer-icon-container">
                    <InstagramIcon />
                    <FacebookIcon />
                    <GithubIcon />
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;