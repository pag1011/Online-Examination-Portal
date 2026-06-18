const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected");
    console.log(conn.connection.host);
  } catch (error) {
    console.error("Database Connection Error:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;