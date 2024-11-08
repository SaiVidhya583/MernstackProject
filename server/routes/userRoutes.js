import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyPandith,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getAllApprovedPandiths,
  bookingPooja,
  bookingAvailability,
  userPoojas,
  schedulePooja,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/get-user-info", authMiddleware, getUserInfo); // Ensure this route is defined
router.post("/apply-pandith", authMiddleware, applyPandith);
router.post("/mark-all-notifications-as-seen", authMiddleware, markAllNotificationsAsSeen);
router.post("/delete-all-seen-notifications", authMiddleware, deleteAllSeenNotifications);
router.get("/getAllApprovedPandiths", getAllApprovedPandiths);
router.post("/book-pooja", authMiddleware, bookingPooja);
router.post("/booking-availability", authMiddleware, bookingAvailability);
router.get("/user-poojas", authMiddleware, userPoojas);
router.post("/schedule-pooja", authMiddleware, schedulePooja);

export default router;