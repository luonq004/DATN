import express from "express";
import {
    deleteUser,
    getAllUsers,
    saveUser,
    updateUser,
} from "../Controllers/users";

const router_author = express.Router();
router_author.get("/", getAllUsers);
router_author.delete("/:clerkId", deleteUser);
router_author.put("/:clerkId", updateUser);
router_author.post("/save-user", saveUser);

export default router_author;
