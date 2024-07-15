import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  values: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeValue",
    },
  ],
});

export default mongoose.model("Attribute", attributeSchema);
