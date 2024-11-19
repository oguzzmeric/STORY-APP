import express, { request, response } from "express"
import {mongoDBURL, PORT} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', async(request,response)=>{
    console.log(request)
    return response.send('MERN STACK')

})

app.use('/books', booksRoute);


mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app is connected to database');
    app.listen(PORT , (request,response)=>{
        console.log(`app is listening to port : ${PORT}`)
    }); 
})
.catch((error)=>{
    console.log(error);
});
