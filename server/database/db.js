import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}.`.bgBrightGreen.black
    );
  } catch (err) {
    console.log(`MongoDB Database Error ${err}.`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDB;
