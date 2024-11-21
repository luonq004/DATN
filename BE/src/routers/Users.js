import { Router } from "express";
import {
  banUser,
  createUser,
  getAllUsers,
  getUserById,
  restoreUser,
  saveUser,
  softDeleteUser,
  unbanUser,
  updateUser,
  verifyPassword,
} from "../controllers/user";
import { checkAuthClerk } from "../middlewares/CheckAuthClerk";
import upload from "../config/upload";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:clerkId", getUserById);
userRouter.post("/soft-delete/:clerkId", checkAuthClerk, softDeleteUser);
userRouter.post("/restore/:clerkId", checkAuthClerk, restoreUser);
userRouter.post("/verify-password", verifyPassword);
userRouter.put("/:clerkId",upload.single('profileImage'), updateUser);
userRouter.post("/save-user", saveUser);
userRouter.post("/create-user", createUser);
userRouter.post("/ban/:clerkId", banUser);
userRouter.post("/unban/:clerkId", unbanUser);

export default userRouter;
