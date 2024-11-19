// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {

  const [book,SetBook] = useState({});
  const[loading,setLoading] = useState(false);

  const { id }  = useParams();
  
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5000/books/${id}`)
    .then((response)=>{
      SetBook(response.data.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  },[])


  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4' >show book</h1>
      {loading ? ( <Spinner/> ) : (
        <div>
          <span>id:</span>
          <span>{book._id}</span>
          <br />
          <span>{book.title}</span>
          <br />
          <span>{book.author}</span>

        </div>
        
      )}
    </div>
  )
}

export default ShowBook