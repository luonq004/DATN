
import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    lowcase: true,
    required: true
  },

  values: {
    type: Array
  }


}, { timestamps: true, versionKey: false });

export default mongoose.model("Attribute", attributeSchema);
