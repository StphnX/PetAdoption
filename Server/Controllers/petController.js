import asyncHandler from "express-async-handler";
import PetModel from "../schemas/petSchema.js";

//GET all pokemon
const getAllPets = asyncHandler(async (req, res, next) => {
    const { query } = req.query;

    if (query) {
        const results = await PetModel.aggregate().search({
            index: "pet",
            text: {
                query,
                // Adapt this one later on when db data is created
                path: ["name", "breed"],
            },
        });
        res.status(200).json(results);
    } else {
        const results = await PetModel.find({}, { name: 1, age: 1, gender: 1, animal_type: 1, breed: 1, health_status: 1, address: 1, zipcode: 1, _id: 0, description: 1 });

        res.status(200).json(results);
    }
});



const getSinglePet = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.json(pet);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getAllPetsByProp = asyncHandler(async (req, res, next) => {
    try {
        const { animal_type } = req.query;

        // Construct a filter object based on the provided query parameter
        const filter = {};

        if (animal_type) {
            filter.animal_type = animal_type;
        }

        // Query the MongoDB collection using the filter
        const pets = await PetModel.find(filter).exec();

        // Send the pets as a JSON response
        res.json(pets);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const postNewPet = asyncHandler(async (req, res) => {
    try {
        const newData = req.body;

        const newPet = new PetModel(newData);

        await newPet.save()
        res.status(201).json({ message: 'New pet entry created successfully!', data: newPet });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating pet entry' });
    }

});







export { getAllPets, getSinglePet, postNewPet, getAllPetsByProp };