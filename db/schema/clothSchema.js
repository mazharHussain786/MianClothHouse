import mongoose from "mongoose";

// Define the Cloth schema
const clothSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "category",  
      required: true,  
    },
    thumbnail: {
      type: String,  
      required: true,  
    },

    images: {
      type: [String],  
      required: true,  
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0, 
    },
    status: {
        type: Boolean,
        default: true, 
      }
  },
  {
    timestamps: true,
  }
);

const Cloth = mongoose.model("Cloth", clothSchema);

export default Cloth;
