import { Router } from "express";
import * as userServices from "../controllers/user.controller";

const router = Router();

router.post("/", userServices.createUser);
router.get("/", userServices.getUsers);
router.get("/:id", userServices.getUserbyId);
router.put("/:id", userServices.updateUserbyId);
router.delete("/:id", userServices.deleteUserbyId);
router.post("/login", userServices.loginUser);

export default router;
