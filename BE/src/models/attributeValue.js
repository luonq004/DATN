import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // Type phải giống với tên cuả attribute
    type: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("AttributeValue", attributeValueSchema);
