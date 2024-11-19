import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userroute.js';
import authRoutes from './routes/authroute.js';

dotenv.config();



mongoose
.connect(process.env.MONGO) 
.then(()=>{
    console.log('connected to database');
})
.catch((error)=>{
    console.log(error);
})

const app = express();
app.use(express.json());



app.listen(3000,()=>{
    console.log('server listining to port:3000');
});

app.use("/api/user",userRoutes);
app.use('/api/auth',authRoutes);


app.use((err,eq,res,next)=>{
    const statusCode = err.statusCode ||500;
    const message = err.message ||'ıternal server Error';
    return res.status(statusCode).json({
        succes:false,
        message,
        statusCode
       })
});




