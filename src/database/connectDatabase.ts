import { connect } from "mongoose"

// Setup the Connection to the MongoDB Database
export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);
  console.log("Database Conected");
}