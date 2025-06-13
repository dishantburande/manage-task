import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./database/db.js";

dotenv.config();

const app = express();


app.use(cors());



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const PORT = 8000;

Connection(USERNAME, PASSWORD);

app.listen(PORT, ()=> console.log(`server is runing on port ${PORT}`));

