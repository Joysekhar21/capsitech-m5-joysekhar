import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./db/index.js";
import userRoutes from './routes/user.routes.js'
import todoRoutes from './routes/todos.route.js'
dotenv.config({path: "./.env"})

const app = express();
const PORT = process.env.PORT || 7088;

app.use(cors({origin: "*"}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Dev! hi")
})

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/todo',todoRoutes)

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb Connection Failed !!!",err)
})
