import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  pandithName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "scheduled",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pandithId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pandith",
    required: true,
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
