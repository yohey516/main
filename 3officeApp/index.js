import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { responseList } from "./config/response-list.js";
import userController from "./controllers/userController.js";
import noteController from "./controllers/noteController.js";
import path from "path"
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, "build")))
app.use(express.json());
mongoose.connect(process.env.MONGODB).then(() => {
  console.log("mongodb connected!");
});

app.use("/api/v1", userController);
app.use("/api/v1", noteController);

// app.all("*", (req, res) => {
//   res.status(404).json({ message: responseList.NOT_FOUND });
// });
app.get("/*", (req,res)=>{
  res.sendFile(path.join(__dirname, "build", "index.html"))
})
app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
