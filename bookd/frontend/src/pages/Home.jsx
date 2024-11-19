// eslint-disable-next-line no-unused-vars
import React , {useEffect,useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';



const Home = () => {

  const [books , setBooks] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then((response)=>{
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);

      })
  },[])


  return (
    <div>
      <div>
        <h2>book list</h2>
      </div>
      {loading ? (<Spinner/>):(
        <table>
          <thead>
            <tr>
              <th>no</th>
              <th>title</th>
              <th>author</th>
              <th>year</th>
              <th>operation</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) =>(
              <tr key={book.id} className='h-8' >
                <td>{index+1}</td>
                <td className='text-black' >{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishyear}</td>
                <td>
                  <div>
                    <Link to={`/books/details/${book._id}`} >
                      <BsInfoCircle className='text-green-900' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`} >
                      <AiOutlineEdit className='text-green-900' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`} >
                      <MdOutlineDelete className='text-green-900' />
                    </Link>

                  </div>
                </td>


              </tr>

            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home;