import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function NotFound() {

    return(
        <>
        <Menu />
        <main className="content">
            <h1>404</h1>
            <h2>Page not found!</h2>
        </main>
        <Footer />
        </>
    );
}

export default NotFound;