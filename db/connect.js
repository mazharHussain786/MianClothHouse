import mongoose from "mongoose";

const connect = async () => {
    try
    {
        await mongoose.connect(process.env.mongo_uri);
        console.log("DataBase Connected")
    }
    catch(error)
    {
        throw Error("DataBase connection error ",error)
    }
 
};

export{connect}