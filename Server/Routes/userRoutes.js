import { Router } from "express";
import {
    getSingleUser,
    editUser,
    deleteUser
} from "../Controllers/userControllers.js";

const userRouter = Router();

// userRouter.route("/").get(getAllPets);
userRouter.route("/:id").get(getSingleUser);
userRouter.route("/:id").put(editUser);
userRouter.route("/:id").delete(deleteUser);

export default userRouter;