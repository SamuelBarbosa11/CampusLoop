import { Router } from "express";

import { upload } from "../config/multer.js";

import * as uploadController from "../controllers/upload.controller.js";

const router = Router();

router.post("/", upload.single("image"), uploadController.upload);

export default router;
