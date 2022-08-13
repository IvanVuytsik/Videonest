import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js"; //exported as default
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

import cookieParser from "cookie-parser";


import cors from "cors";

import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {console.log("Connected to DB!")}).catch((err) => {throw err})
}

//middleware
app.use(express.json())
app.use(cors())


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

//cookies
app.use(cookieParser())

//routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(process.env.PORT || 8800, () => {
    console.log("Server is running!")
    connect() 
})