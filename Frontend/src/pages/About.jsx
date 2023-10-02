import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function About () {

    return (
        <>
        <Menu />
        <main className="content">
            <div>
                <h1>Hello I'm an about page</h1>
            </div>    
        </main>
        <Footer />
        </>
    );
}

export default About;