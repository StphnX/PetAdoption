import React from "react";

function Footer (){

    return (
        <>
        <footer>
            <div className="footer-content-container">
                <p>Copyright © {new Date().getFullYear()} CleaTheShelters</p>
                <p>Something here</p>
            </div>
        </footer>
        </>
    );
}

export default Footer;