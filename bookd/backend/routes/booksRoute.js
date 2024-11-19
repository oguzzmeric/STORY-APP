import express from 'express';
const router = express.Router();

import { Book } from '../models/bookModel.js';


//get all books
router.get('/',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.json({
            count : books.length,
            data : books
        });
    }catch(error){
       return response.send({message:error.message})
    }
});

//get one book from database by id
router.get('/:id',async(request,response)=>{
    try{
        const { id } = request.params;
        const books = await Book.findById(id);

        return response.json({
            count : books.length,
            data : books 
        });
    }catch(error){
        console.log({message : error.message})
    }
});

//Delete book by id
router.delete('/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id , )

        if(!result){
            return response.json({message : 'book not found'});
        }
        return response.json({message : 'book deleted.'});
        
    }catch(error){
        console.log(error);
        response.send({message : error.message})
    }
})

//update book
router.put('/:id' ,async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishyear
        ){
            return response.send({
                message : 'send all required fields'
            });

        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);
        
        if(!result){
            return response.json({message : 'book not found'})
        }

        return response.send({message : 'book updated succesfully '})
    }catch(error){
        console.log(error);
        response.send({message : error.message})
    }
})


//save book
router.post('/',async(request,response)=>{
    try{
        if(!request.body.title|| 
           !request.body.author||
           !request.body.publishyear
        ){
            return response.send({
                message  : 'send all required fields'
            });
             
        }
        const newbook = {
            title : request.body.title,
            author : request.body.author,
            publishyear : request.body.publishyear
        };
        const book  = await Book.create(newbook);
        return response.send(book);
        
    }catch(error){
        console.log(error);
        response.send({message : error.message});
    };
});

export default router;


