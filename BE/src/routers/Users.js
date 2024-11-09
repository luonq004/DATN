import { Router } from "express";
import {
  banUser,
  deleteUser,
  getAllUsers,
  getUserById,
  saveUser,
  unbanUser,
  updateUser,
} from "../controllers/user";
import { checkAuthClerk } from "../middlewares/CheckAuthClerk";
import upload from "../config/upload";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:clerkId", getUserById);
userRouter.delete("/:clerkId", checkAuthClerk, deleteUser);
userRouter.put("/:clerkId",upload.single('profileImage'), updateUser);
userRouter.post("/save-user", saveUser);
userRouter.post("/ban/:clerkId", banUser);
userRouter.post("/unban/:clerkId", unbanUser);

export default userRouter;
