import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./database/db.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import { errorMiddleware } from "./midddlewares/error.js";


const app = express();
dotenv.config();

app.use(
  cors({
    origin: [process.env.FROENTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

const PORT = 8000;

Connection(USERNAME, PASSWORD);


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));


export default app;