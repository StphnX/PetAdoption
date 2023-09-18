import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getSinglePetInfo,
} from "../Controllers/petController.js";

const petRouter = Router();

petRouter.route("/allPets").get(getAllPets);
petRouter.route("/:id").get(getSinglePet);
petRouter.route("/:id/:prop").get(getSinglePetInfo);

export default petRouter;