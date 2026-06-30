import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a service name"],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Please add a React Icon identifier"],
    },
    description: {
      type: String,
      required: [true, "Please add a service description"],
    },
    image: {
      type: String,
      required: [true, "Please add an image URL"],
    },
  },
  {
    timestamps: true,
  },
);
const Service = mongoose.model("Service", serviceSchema);
export default Service;
