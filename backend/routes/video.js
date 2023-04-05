import express from "express";
import {
  uploadVideo,
  streamVideo,
  downloadVideo,
} from "../controllers/video.js";

// middleware multer to upload files
const router = express.Router();

router.post("/upload", uploadVideo); // upload video
router.get("/stream/:fileName", streamVideo); // stream video
router.get("/download/:fileName", downloadVideo); // download video

export default router;
