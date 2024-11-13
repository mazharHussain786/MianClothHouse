import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },

    password:
    {
      type:String,
      required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate:
        {
            validator:function(val)
            {
                return validator.isEmail(val)
            },
            message:"Email is not valid "
        }
    },
    verified:
    {
      type:Boolean,
      default:false,
    },
    role:
    {
        type:String ,
        default:"user"
    }},
   {
    timestamps: true,
  }
);

userSchema.pre('save',async function()
{
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword=async function(pasword)
{
    return  await bcrypt.compare(pasword,this.password)
}

const user = mongoose.model("users", userSchema);


export default user;
