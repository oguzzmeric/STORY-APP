import mongoose, { Types } from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type : String,
            required : true
        },
        author : {
            type : String,
            required : true
        },
        publishyear : {
            type : Number,
            required : false
        },
    },
    {
        timestamps : true,
    }
    
);

export const Book = mongoose.model('Cat' , bookSchema);
