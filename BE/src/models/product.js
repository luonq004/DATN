import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

import Cart from "./cart.js";

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

    // price: {
    //   type: Number,
    //   required: true,
    // },

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

    attribute: [Object],

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

productSchema.pre('findOneAndDelete', async function (next) {
  this._doc = await this.model.findOne(this.getQuery());
  next();
});

productSchema.post('findOneAndDelete', async function (doc) {
  // console.log(doc)
  await Cart.updateMany(
    { "products.productItem": doc._id },
    { $pull: { products: { productItem: doc._id } } }
  );
});

export default mongoose.model("Product", productSchema);
