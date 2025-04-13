import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`\nMongoDB is successfully connected !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error ",error);
        process.exit(1);
    }
}

export default connectDB