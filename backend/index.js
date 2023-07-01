import express, { urlencoded } from "express";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import { dbConnection } from "./dbConnections.js";

dotenv.config();
dbConnection();

/*CONFIGURATION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const port = process.env.port || 5001;

app.listen(port, () => {
  console.log(`connected to the ${port}`);
});
