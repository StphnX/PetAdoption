import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getAllPetsByProp,
    postNewPet,
    deletePet,
} from "../Controllers/petController.js";

const petRouter = Router();

petRouter.route("/allPets").get(getAllPets);
petRouter.route("/Pet/:id").get(getSinglePet);
petRouter.route("/:prop").get(getAllPetsByProp);
petRouter.route("/Pet/create").post(postNewPet);
// petRouter.route("/Pet/edit/:id").put(editNewPet);
petRouter.route("/Pets/:id").delete(deletePet);

export default petRouter;