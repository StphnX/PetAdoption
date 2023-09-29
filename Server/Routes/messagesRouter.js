import { Router } from "express";
import messageController from "../Controllers/messagesControllers.js";

const router = Router();

router.get('/chat', messageController);

export default router;