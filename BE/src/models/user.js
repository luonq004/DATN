import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema);