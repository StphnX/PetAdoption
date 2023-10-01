import asyncHandler from "express-async-handler";
import PetModel from "../schemas/petSchema.js";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

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
        const results = await PetModel.find({}, { name: 1, age: 1, gender: 1, animal_type: 1, breed: 1, health_status: 1, address: 1, zipcode: 1, _id: 1, description: 1, picture: 1 });

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
    console.log(req.body)
    try {
        // Check if req.file contains the uploaded image (provided by multer middleware)
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'pets',
        });

        // Now, you can use the result from Cloudinary, which contains the image URL
        const imageUrl = result.secure_url;

        // Create a new pet object with the image URL and other data from req.body
        const newData = {
            ...req.body,
            image: imageUrl, // Assuming your PetModel expects an 'image' field
        };

        const newPet = new PetModel(newData);

        await newPet.save();
        res.status(201).json({ message: 'New pet entry created successfully!', data: newPet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating pet entry' });
    }
    // try {
    //     const result = await cloudinary.uploader.upload(image, {
    //         folder: "pets"
    //     })
    //     console.log(result)
    //     // image: {
    //     //     publi_id: result.publi_id,
    //     //     url: result.secure_url
    //     // }
    //     const newData = req.body;

    //     const newPet = new PetModel(newData);

    //     await newPet.save()
    //     res.status(201).json({ message: 'New pet entry created successfully!', data: newPet });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Error creating pet entry' });
    // }

});

const editPet = asyncHandler(async (req, res) => {

    try {
        const petId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Update the pet using findByIdAndUpdate
        const updatedPet = await PetModel.findByIdAndUpdate(
            petId,
            req.body, // Assuming the request body contains the updated pet data
            { new: true } // Return the updated document
        ).exec();

        // Check if the pet was found and updated
        if (!updatedPet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.json({ message: 'Pet updated successfully', updatedPet });
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const deletePet = asyncHandler(async (req, res) => {
    try {
        const petId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Attempt to delete the pet by its ID
        const deletedPet = await PetModel.findByIdAndRemove(petId).exec();

        // Check if the pet was found and deleted
        if (!deletedPet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.json({ message: 'Pet deleted successfully', deletedPet });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getPetsByOwner = asyncHandler(async (req, res) => {
    try {
        const ownerID = req.params.owner;

        // Assuming you have a PetModel with an 'owner' field referencing the owner's ID
        const pets = await PetModel.find({ owner: ownerID });

        if (!pets || pets.length === 0) {
            return res.status(404).json({ message: 'No pets found for this owner' });
        }

        res.json(pets);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




export { getAllPets, getSinglePet, postNewPet, getAllPetsByProp, editPet, deletePet, getPetsByOwner };