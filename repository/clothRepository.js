import Cloth from "../db/schema/clothSchema.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from 'cloudinary'
import { configDotenv } from "dotenv";
import { meili_client } from "./utils.js";
import { categoryModel } from "../db/schema/catagorySchema.js";
configDotenv()




const searchCloth=async (req,res)=>
{
  const {q}=req.query;
  const clothIndex=meili_client.index(process.env.INDEX_NAME)
  try
  {
    const result=await clothIndex.search(q)
    return await res
    .status(StatusCodes.OK)
    .json({ msg: "success", data: result });
  }
  catch(err)
  {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}
 




const getCloth = async (req, res) => {
  console.log('get Cloth Endpoint Hit:', req.params);
  try {
    console.log(req.params.id)
    const cloth = await Cloth.findOne({_id:req.params.id});
    if (!cloth) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Cloth not found" });
    }
    return res.status(StatusCodes.OK).json({ msg: "success", data: cloth });
  } catch (error) {
    console.error('Error fetching cloth:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error", error: error.message });
  }
};


const changeStatus = async (req, res) => {
  const item = await Cloth.findById(req.params.id);
  if (!item) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "ID is invalid" });
  }
  item.status = !item.status;
  const updatedCloth = await item.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "success", Cloth: updatedCloth });
};

const createCloth = async (req, res) => {
  try {
    const { category: categoryName, discount, images, price, name, status } = req.body;
    let categoryObj = await categoryModel.findOne({ name: categoryName }) || await categoryModel.create({ name: categoryName });
    const savedCloth = await Cloth.create({
      category: categoryObj._id,
      discount,
      images,
      price,
      name,
      status
    });

    console.log(req.body)

    const data=await meili_client.index(process.env.INDEX_NAME).addDocuments([req.body]); 
     console.log("MileSEarch status",data.status)
    return res.status(StatusCodes.CREATED).json({ msg: "success", Cloth: savedCloth });
  } catch (error) {
    console.error('Error creating cloth:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error", error: error.message });
  }
};
export {getCloth,createCloth,changeStatus,searchCloth}