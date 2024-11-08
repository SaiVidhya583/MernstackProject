import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PandithModel from "../Models/PandithModel.js";
import BookingModel from "../Models/BookingModel.js";
import moment from "moment";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 characters",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful!",
      success: true,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//********* GET USER INFO (FOR PROTECTED ROUTES) ******/
export const getUserInfo = async (req, res, next) => {
  try {
    //Get user
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists!",
        success: false,
      });
    }

    //Success response
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

export const applyPandith = async (req, res) => {
  try {
    const { userId, firstName, lastName, phoneNumber, address, department, specialization, experience, feePerConsultation, timings } = req.body;

    if (!userId || !firstName || !lastName || !phoneNumber || !address || !department || !specialization || !experience || !feePerConsultation || !timings) {
      return res.status(400).json({ message: "All fields are required!", success: false });
    }

    const newPandith = new PandithModel({
      userId,
      firstName,
      lastName,
      phoneNumber,
      address,
      department,
      specialization,
      experience,
      feePerConsultation,
      timings,
      status: "pending"
    });

    await newPandith.save();

    const getAdmin = await UserModel.findOne({ isAdmin: true });
    if (!getAdmin) {
      return res.status(404).json({ message: "Admin user not found!", success: false });
    }

    const unSeenNotifications = getAdmin.unSeenNotifications;
    unSeenNotifications.push({
      type: "new-pandith-request",
      message: `${newPandith.firstName} ${newPandith.lastName} has applied for a pandith account!`,
      data: {
        pandithId: newPandith._id,
        name: `${newPandith.firstName} ${newPandith.lastName}`,
      },
      onClickPath: "/admin/Pandiths",
    });

    await UserModel.findByIdAndUpdate(getAdmin._id, { unSeenNotifications });

    return res.status(201).json({ message: "Pandith account applied successfully!", success: true });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

export const markAllNotificationsAsSeen = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!", success: false });
    }

    user.seenNotifications.push(...user.unSeenNotifications);
    user.unSeenNotifications = [];

    await user.save();

    return res.status(200).json({
      success: true,
      message: "All notifications marked as seen!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

export const deleteAllSeenNotifications = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!", success: false });
    }

    user.seenNotifications = [];

    await user.save();

    return res.status(200).json({
      success: true,
      message: "All seen notifications deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

export const getAllApprovedPandiths = async (req, res) => {
  try {
    const pandiths = await PandithModel.find({ status: "approved" });
    if (!pandiths) {
      return res.status(404).json({
        success: false,
        message: "Pandith not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pandith list fetched successfully!",
      data: pandiths,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

export const bookingPooja = async (req, res) => {
  try {
    let { pandithId, userId, pandithInfo, userInfo, date, time, status } = req.body;
    if (!date || !time) {
      return res.status(422).json({
        success: false,
        message: "Please select date and time!",
      });
    }

    date = moment(date, "DD-MM-YYYY").toISOString();
    time = moment(time, "HH:mm").toISOString();
    status = "pending";

    const newBookings = new BookingModel({
      pandithId,
      userId,
      pandithInfo,
      userInfo,
      date,
      time,
      status,
    });
    await newBookings.save();

    const user = await UserModel.findById(pandithInfo.userId);
    user.unSeenNotifications.push({
      type: "New-Booking-Request",
      message: `A new pooja booking request from ${userInfo.name}`,
      onClickPath: "/user/poojas",
    });
    await user.save();

    return res.status200().json({
      success: true,
      message: "Pooja booking successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

export const bookingAvailability = async (req, res) => {
  try {
    const { pandithId, date, time } = req.body;
    const isoDate = moment(date, "DD-MM-YYYY").toISOString();
    const isoTime = moment(time, "HH:mm").toISOString();
    const fromTime = moment(isoTime).subtract(1, "hours").toISOString();
    const toTime = moment(isoTime).add(1, "hours").toISOString();

    const bookings = await BookingModel.find({
      pandithId,
      date: isoDate,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (bookings.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Pooja not available at this time",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Pooja available, you can book now!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

export const userPoojas = async (req, res) => {
  try {
    const poojas = await BookingModel.find({ userId: req.body.userId })
      .populate("userInfo")
      .populate("pandithInfo");
    if (!poojas) {
      return res.status(404).json({
        success: false,
        message: "No poojas found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Poojas Fetched Successfully!",
      data: poojas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
