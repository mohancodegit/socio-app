import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected to", connectionDb.connection.host);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
