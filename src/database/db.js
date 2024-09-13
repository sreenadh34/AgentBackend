import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((response) => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.error(err));
};

export default connectDB;