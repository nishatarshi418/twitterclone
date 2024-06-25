import mongoose from "mongoose";

const connectMongoDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB connected to mongodb:${conn.connection.host}`);
        
        
    } catch (error) {
        console.error(`Error connecting to mongoDB:${error.message}`);
        process.exist(1);
        
    }
}

export default connectMongoDB;