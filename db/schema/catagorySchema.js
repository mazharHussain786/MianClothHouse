import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Catagory name is required"],
    }
},{timestamps:true})

const categoryModel=mongoose.model("category",catagorySchema)

export {categoryModel}
