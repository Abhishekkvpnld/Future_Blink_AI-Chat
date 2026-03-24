import mongoose from "mongoose";


const dbConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("MongoDB connection URI is missing from environment variables.");
    }

    // Connect to the MongoDB database
    await mongoose.connect(mongoUri, {});

    console.log("Server connected to the database successfully...📅");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default dbConnection;