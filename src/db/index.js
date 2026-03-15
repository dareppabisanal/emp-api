import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`Mongodb connected!!! Host: ${dbConnection.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDb;