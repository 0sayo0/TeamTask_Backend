import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import projectRouter from "./routes/projectRouter";

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

//Loggin
app.use(morgan("dev"));

//Read forms data
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

export default app;
