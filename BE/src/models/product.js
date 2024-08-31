import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    countOnStock: {
      type: Number,
      required: true,
    },

    avatarMain: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    createAt: {
      type: Date,
      default: Date.now(),
      // Ta có thể bỏ qua field khỏi schema khi được select (Trong trg hợp data nhạy cảm,...)
      select: false,
    },

    reviews: [Object],

    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(paginate);

const Products= mongoose.model("Product", productSchema);
export default Products