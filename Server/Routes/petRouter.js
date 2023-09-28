import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getAllPetsByProp,
    postNewPet,
    editPet,
    deletePet,
} from "../Controllers/petController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const petRouter = Router();

petRouter.route("/allPets").get(getAllPets);
petRouter.route("/Pet/:id").get(getSinglePet);
petRouter.route("/:prop").get(getAllPetsByProp);
petRouter.route("/Pets/create").post(upload.single('image'),postNewPet);
petRouter.route("/Pets/:id").put(editPet);
petRouter.route("/Pets/:id").delete(deletePet);

export default petRouter;