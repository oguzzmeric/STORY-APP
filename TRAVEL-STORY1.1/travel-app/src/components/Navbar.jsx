import React from 'react';
import LOGO2 from '../assets/images/LOGO2.png'
import ProfileInfo from './Card/ProfileInfo';
import { useNavigate } from 'react-router';
import SearchBar from './input/SearchBar';

function Navbar({userInfo ,searchQuery,setSearchQuery , onSearchNote,handleClearSearch}) {

    const isToken = localStorage.getItem("token");
    const navigate  = useNavigate();



    const onLogout = () =>{
        localStorage.clear();
        navigate('/login')

    }
    const handleSearch = () =>{

      if(searchQuery){
        onSearchNote(searchQuery);
      }
    }

    const onClearSearch = () =>{
      handleClearSearch();
      setSearchQuery("")
    }

    const reBack = () => {
      navigate('/');

    }

  return (
    <div   className='bg-white flex items-center justify-between px-4 py-1 drop-shadow sticky top-0 z-10' >
        <img onClick={reBack}  src={LOGO2} alt='travel story' className='h-20' />
        {isToken &&( 
          <>
          <SearchBar 
          value={searchQuery}
          onChange = {({target}) =>{
            setSearchQuery(target.value);
          }}
          handleSearch = {handleSearch}
          onClearSearch = {onClearSearch}

          />

          <a href="/line" class="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Akış</a>
          
          <ProfileInfo userInfo = {userInfo} onLogout={onLogout} />{" "}
          
          </>
          )}
    </div>
  )
}

export default Navbar 