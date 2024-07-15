import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },

  values: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeValue",
      required: true,
    },
  ],

  countOnStock: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Variant", variantSchema);
