import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUser,
  getAllPandith,
  changeAccountStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/getAllUser", authMiddleware, getAllUser);
router.get("/getAllPandiths", authMiddleware, getAllPandith);
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus);

export default router;
