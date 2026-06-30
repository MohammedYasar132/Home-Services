import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [
        true,
        "Please associate this subcategory with a parent service",
      ],
    },
    name: {
      type: String,
      required: [true, "Please add a subcategory name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    features: {
      type: [String],
      required: [true, "Please add features list"],
    },
    whatsIncluded: {
      type: [String],
      required: [true, "Please list what is included in this service"],
    },
    estimatedTime: {
      type: String,
      required: [true, "Please add estimated service time duration"],
    },
    whyChooseUs: {
      type: [String],
      required: [true, "Please add why choose us bullet points"],
    },
    image: {
      type: String,
      required: [true, "Please add a subcategory display image URL"],
    },
  },
  {
    timestamps: true,
  },
);
// Add unique index on serviceId and name to avoid duplicate subcategories under the same service category
subcategorySchema.index({ serviceId: 1, name: 1 }, { unique: true });
const Subcategory = mongoose.model("Subcategory", subcategorySchema);
export default Subcategory;
