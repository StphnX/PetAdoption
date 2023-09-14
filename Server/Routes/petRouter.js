import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getSinglePetInfo,
} from "../Controllers/pokemonController.js";

const petRouter = Router();

pokemonRouter.route("/allPets").get(getAllPets);
pokemonRouter.route("/:id").get(getSinglePet);
pokemonRouter.route("/:id/:prop").get(getSinglePetInfo);

export default petRouter;