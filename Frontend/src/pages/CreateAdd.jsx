import React from "react";

function CreateAdd () {

    return (
        <>
        <h1 className="margin">Create an add for your pet:</h1>
        <form action="" className="create-add-form">
            <label htmlFor="petName">Name of your pet:</label>
            <input className="box" type="text" id="petName" />
            <label htmlFor="healthStatus">Health status:</label>
            <input className="box" type="text" id="healthStatus"/>
            <label htmlFor="type">Type of pet:</label>
            <input className="box" type="text" id="type"/>
            <label htmlFor="breed">Breed:</label>
            <input className="box" type="text" id="breed"/>
            <fieldset>
                <legend>Gender:</legend>
                <div>
                    <input type="radio" id="female" name="gender" value="female" defaultChecked />
                    <label htmlFor="huey">Female</label>
                </div>
                <div>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="dewey">Male</label>
                </div>
            </fieldset>
            <label htmlFor="desctiption">Description:</label>
            <textarea className="box" name="" id="description" cols="30" rows="10"></textarea>
            <input type="file" accept="image/*" />
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default CreateAdd;