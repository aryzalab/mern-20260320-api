import express from "express";

import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.put("/profile-image", userController.updateProfileImage);

router.get("/:id", userController.getById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
