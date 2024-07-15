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
});

export default mongoose.model("AttributeValue", attributeValueSchema);
