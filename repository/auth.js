import { StatusCodes } from "http-status-codes";
import user from "../db/schema/userSchema.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import mongoose from "mongoose";
import { sendEmail } from "./utils.js";
config();

const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "all Fields are required " });
    }
    const userData = await user.findOne({ email });

    if (userData) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already exsits" });
    }
    const { role } = await user.create(req.body);
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendEmail(token, email);
    await session.commitTransaction();
    res
      .status(200)
      .json({ message: `Verification email sent ${info.messageId}` });
  } catch (err) {
    await session.abortTransaction();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  } finally {
    await session.endSession();
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fields are required" });
  }
  const candidate = await user.findOne({ email });
  if (!candidate) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  if (!(await candidate.comparePassword(password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  const role = { candidate };
  const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(StatusCodes.ACCEPTED).json({ msg: "Successful", token });
};

export {register,login};
