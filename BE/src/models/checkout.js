import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Checkout", checkoutSchema);
