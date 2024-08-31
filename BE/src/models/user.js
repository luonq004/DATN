import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      unique: true, 
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String
    },
  },
  {
    collection: "users",
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
