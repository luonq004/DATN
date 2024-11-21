import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
