import express from "express";
import {
  getMyReports,
  getAReport,
  postReport,
  getReports,
} from "../controllers/report.controller.js";
import { upload } from "../lib/cloudinary.js";
import { protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectAuth);

router.get("/", getReports);

router.get("/my", getMyReports);

router.get("/:id", getAReport);

router.post("/", upload.single("image"), postReport);

export default router;
