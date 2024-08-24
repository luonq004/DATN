import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },
}, { timestamps: true, versionKey: false });

export default mongoose.model("AttributeValue", attributeValueSchema);
