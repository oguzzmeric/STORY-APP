import React from 'react'
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';



const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handlesavebook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
    .post('http://localhost:5000/books',data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      console.log(error);
      alert('error happend check the console');
    });


  };



  
  return (
    <div>
      <BackButton/>
      <div>
        <div>
          <h2>CreateBook</h2>
          {loading ? <Spinner/> : ''}
          <div>
            <label >title:</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  />
          </div>
          <div>
            <label>author</label>
            <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} />
          </div>
          <div>
            <label>publishyear</label>
            <input type="number" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} />
          </div>
          <button className='bg-amber-500' onClick={handlesavebook} >save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBook