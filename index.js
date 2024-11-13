import express from "express";
import { configDotenv } from "dotenv";
import { connect } from "./db/connect.js";
import { router } from "./routes/route.js";
import { limiter} from "./middlewares/throttling_middleware.js";
import cors from 'cors'
configDotenv();

const app = express();

app.use(cors())

app.use(express.json());
app.use(limiter)
app.use('/',router)



const PORT = process.env.PORT;

const start = async () => {
  try {
    await connect();
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
};




start()
