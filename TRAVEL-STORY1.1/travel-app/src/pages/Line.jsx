import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import TravelStoryCard2 from '../components/Card/TravelStoryCard2';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import ViewTravelStorynf from '../components/Card/ViewTravelStorynf';
import Modal from 'react-modal';

const Line = () => {


  const navigate = useNavigate();
  const [nfallstories,setnfallstories] = useState([]);

  const [userInfo , setUserInfo] = useState(null);
  const {story,setStory} = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
  const [FilterType,setFilterType] = useState("");
  const [dateRange,setDateRange] = useState({ form:null , to:null });
   

  const [OpenViewModal ,setOpenViewModal] = useState({
    isShown : false,
    data:null
  })
 
  const getUserInfo = async() =>{

    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
        console.log(response.data.user.fullName);

      }
    }catch(error){
      console.log(error);
      navigate("/login")
    }

  }
  
  
  const getnfAllStories = async()=> {

    try{
      const response = await axiosInstance.get('/get-nf-all-stories');
      if(response.data && response.data.stories){
        setnfallstories(response.data.stories);
      }
      console.log(response.data.stories);
    }catch(error){
      console.log(error)
    }
  }

  const handleClearSearch = async(query) => {
    setFilterType("");
    getnfAllStories();
  
  }
  const handleViewStory = (data) =>{
    console.log(data);
    setOpenViewModal({isShown:true , data});
  
  
  
  }

  const onSearchStory = async(query) =>{
    try{
      const response = await axiosInstance.get("/searchnf",{
        params:{
          query,
        },
      });
  
      if(response.data && response.data.stories){
        setFilterType("search");
        setnfallstories(response.data.stories);
        console.log(response.data.stories);
      }
  
    }catch(error){
  
      console.log(error)
    }
  }


  useEffect(()=>{
    getUserInfo
    getnfAllStories();

    return ()=>{}
  },[]);


  return (
    <div>
      <Navbar
      userInfo={userInfo}  
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      handleClearSearch={handleClearSearch}  
      onSearchNote ={onSearchStory}
      />
      <div className='container mx-auto py-10'>
      <div className='flex gap-6' >
       <div className='flex-1' >
        <div className='grid grid-cols-3 gap-3' >
        {nfallstories.map((item)=>{
          return(
            <TravelStoryCard2 
                key = {item._id}
                id = {item._id}
                imgUrl = {item.imageUrl}
                title = {item.title}
                story={item.story}
                date={item.visitedDate}
                onClick={()=>handleViewStory(item)}
                visitedLocation={item.visitedLocation}
            />
          )
        })}

        </div>
        <Modal
        isOpen = {OpenViewModal.isShown}
        onRequestClose = {()=>{}}
        style={{
          overlay:{
            backgroundcolor : "rgba(0,0,0,10.2)",
            zIndex :999
          },
        }}
        appElement = {document.getElementById("root")}
        className="model-box rounded-xl"
        >

       <ViewTravelStorynf
        storyInfo = {OpenViewModal.data ||null}
        onClose={()=>{
          setOpenViewModal((prevState)=>({...prevState,isShown:false}));
          
        }}
        />


        </Modal>

        
       </div>
      </div>
    </div>
    </div>
    
  )
}

export default Line