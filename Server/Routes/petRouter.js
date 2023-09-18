import { Router } from "express";
import {
    getAllPets,
    getSinglePet,
    getSinglePetInfo,
    postNewPet,
} from "../Controllers/petController.js";

const petRouter = Router();

petRouter.route("/allPets").get(getAllPets);
petRouter.route("/:id").get(getSinglePet);
petRouter.route("/:id/:prop").get(getSinglePetInfo);
petRouter.route("/Pet/create").post(postNewPet);
// petRouter.route("/Pet/edit/:id").put(editNewPet);
// petRouter.route("/Pet/delete/:id").delete(delNewPet);

export default petRouter;