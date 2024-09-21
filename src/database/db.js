import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect("mongodb+srv://shorts:W4xRJzkZWB0SVckq@cluster0.v9gmobn.mongodb.net/eduartista")
    .then((response) => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.error(err));
};

export default connectDB;