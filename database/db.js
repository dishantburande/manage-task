import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.onwkg9h.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database Connecte Successfully");
  } catch (error) {
    console.log(" Error while Connecting with Database", error);
  }
};

export default Connection;
