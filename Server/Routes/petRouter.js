import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getAllPetsByProp,
    postNewPet,
    editPet,
    deletePet,
    getPetsByOwner,
    uploadImage
} from "../Controllers/petController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const petRouter = Router();

// Routes for pets
petRouter.route("/allPets").get(getAllPets);
petRouter.route("/Pet/:id").get(getSinglePet);
petRouter.route("/:prop").get(getAllPetsByProp);
petRouter.route("/Pets/create").post(postNewPet);
petRouter.route("/Pets/upload-image").post(upload.single('image'), uploadImage);
petRouter.route("/Pets/:id").put(editPet);
petRouter.route("/Pets/:id").delete(deletePet);

// Route for getting pets by owner
petRouter.route("/allPets/:owner").get(getPetsByOwner);

export default petRouter;