import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_URL as string);
};

export default dbConnect;
