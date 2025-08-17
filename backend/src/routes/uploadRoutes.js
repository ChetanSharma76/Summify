import express from "express";
import {upload} from "../middlewares/uploadMiddleware.js";
import { handleFileUpload } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("file"), handleFileUpload);

export default router;
