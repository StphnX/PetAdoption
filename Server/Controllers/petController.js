import asyncHandler from "express-async-handler";
import Pet from "../schemas/petSchema";

//GET all pokemon
const getAllPets = asyncHandler(async (req, res, next) => {
    const { query } = req.query;

    if (query) {
        const results = await Pet.aggregate().search({
            index: "pet",
            text: {
                query,
                // Adapt this one later on when db data is created
                path: ["name", "breed"],
            },
        });
        res.status(200).json(results);
    } else {
        const results = await Pet.find({}, { name: 1, age: 1, gender: 1, animal_type: 1, breed: 1, health_status: 1, address: 1, postcode: 1, _id: 0 });

        res.status(200).json(results);
    }
});


// GET single pokemon

const getSinglePet = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const searchProp = Number(id) ? "petId" : "name";
    const searchValue = Number(id) || /id/i;
    const filter = { [searchProp]: searchValue };

    const result = (await Pet.findOne(filter)) ?? {};

    if (!result) {
        return res.status(400).json({
            message: `Query for ${searchProp}: ${searchValue} did not return any results.`,
        });
    }

    res.status(200).json(result);
});

const getSinglePetInfo = asyncHandler(async (req, res, next) => {
    const { id, prop } = req.params;

    const searchProp = Number(id) ? "petId" : "name";
    const searchValue = Number(id) || /id/i;

    const filter = { [searchProp]: searchValue };
    const projection = { [prop]: 1 };

    const result = await Pet.findOne(filter, projection);

    if (!result) {
        return res.status(400).json({
            message: `Query for ${searchProp}: ${searchValue} did not return any results.`,
        });
    }

    let retObj = result.toObject();

    // if the prop we are looking for does not exist, this endpoint
    // should not return anything... but mongoDB always returns an Object
    // with a single property if the document exists (property _id)
    if (Object.keys(retObj).length === 1) {
        retObj = {};
    }

    res.status(200).json(retObj);
});

export { getAllPets, getSinglePet, getSinglePetInfo };