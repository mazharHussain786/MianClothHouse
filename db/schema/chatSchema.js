import mongoose from "mongoose";


const chatSchema=new mongoose.Schema({

    senderId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    receiverId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    message:
    {
        type:String,
        required:true,
    },
    status:
    {
        type:Boolean,
        default:false
    }
    

},
{
    timestamps:true
})

const chatModel=mongoose.model('chat',chatSchema)
export default chatModel