import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Await, useNavigate } from 'react-router'
import axiosInstance from '../utils/axiosInstance';
import TravelStoryCard from '../components/Card/TravelStoryCard';
import Modal from 'react-modal';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd } from "react-icons/md";
import { AddEditStory } from './AddEditStory';
import ViewTravelStory from '../components/Card/ViewTravelStory';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';


function Home() {

  const navigate = useNavigate();
  const [userInfo , setUserInfo] = useState(null);
  const [allStories,setAllStories] = useState([]);
  const {story,setStory} = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
  const [FilterType,setFilterType] = useState("");
  const [dateRange,setDateRange] = useState({ form:null , to:null });
   

  const [openAddEditModal,setOpenEditModal] = useState({
    isShown:false,
    type:"add",
    data:null
  });

  const [OpenViewModal ,setOpenViewModal] = useState({
    isShown : false,
    data:null
  })

  //get userInfo
  const getUserInfo = async ()=>{
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
  };

  //get all stories
const getAllStories = async ()=>{
    try{
      const response = await axiosInstance.get("/get-all-stories");
      if(response.data && response.data.stories){
        setAllStories(response.data.stories);
      }
    }catch(error){
      console.log(error);
    }
  };

const handleEdit = (data) =>{
  setOpenEditModal({isShown:true, type:"edit" , data : data })
};

const handleViewStory = (data) =>{
  console.log(data);
  setOpenViewModal({isShown:true , data});



}


const updateisfavorite = async(storyData) =>{

  const storyId = storyData._id;
  
  try{
    console.log(storyId);
    const response = await axiosInstance.put("/update-is-favorite/"+storyId,
      {
        isFavorite : !storyData.isFavorite
      }
    );
    if(response.data && response.data.story){
      toast.success("story Updated");

      if(FilterType === 'search' && searchQuery){
        onSearchStory(searchQuery);
      }else if(FilterType === "date"){
        filterStoryByDate(dateRange);
      }else{
        getAllStories();
      }
    }
    console.log(storyData.isFavorite);
  }catch(error){
    console.log(error)
  }

}

const deleteTravelStory = async(data)=>{

  const storyId = data._id;

  try{
    const response  = await axiosInstance.delete("/delete-story/"+storyId);

    if(response.data && !response.data.error){
      toast.error("story Deleted Successfully");
      setOpenViewModal((prevState)=>({...prevState , isShown:false}));
      getAllStories();
    }

  }catch(error){
    console.log("error happend",error);
    
  }

}
const onSearchStory = async(query) =>{
  try{
    const response = await axiosInstance.get("/search",{
      params:{
        query,
      },
    });

    if(response.data && response.data.stories){
      setFilterType("search");
      setAllStories(response.data.stories);
    }

  }catch(error){

    console.log(error)
  }
}

const handleClearSearch = async(query) => {
  setFilterType("");
  getAllStories();

}
const filterStoryByDate = async(day) =>{
  try{

    const startDate = day.from ? moment(day.from).valueOf():null;
    const endDate = day.from ? moment(day.to).valueOf():null;
  
    if(startDate && endDate){
      const response  = await axiosInstance.get("/travel-stories/filter",{
        params:{startDate,endDate},
      });

      if(!startDate && !endDate){
        getAllStories(); 
        setFilterType(null)
      }

      if(response.data && response.data.stories){
        setFilterType("date");
        setAllStories(response.data.stories);
      }
    }
  }catch(error){

    console.log(error)
  }
  


}
const handleDayClick = (day) =>{

  setDateRange(day);
  filterStoryByDate(day);

}

  useEffect(()=>{
    getUserInfo();
    getAllStories();

    return ()=>{}
  },[]);


  return (
    <div>
      <Navbar userInfo={userInfo}  
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      handleClearSearch={handleClearSearch}  
      onSearchNote ={onSearchStory} />

      <div className='container mx-auto py-10' >
        <div className='flex gap-6' >
          <div className='flex-1' >

              <div className='grid grid-cols-2 gap-2' >
            {allStories.map((item)=>{
              return(
                <TravelStoryCard 
                key = {item._id}
                imgUrl = {item.imageUrl}
                title = {item.title}
                story={item.story}
                date={item.visitedDate}
                visitedLocation={item.visitedLocation}
                isFavorite = {item.isFavorite}
                onClick={()=>handleViewStory(item)}
                onFavouriteClick = {()=>updateisfavorite(item)}
                />
              );
            })}
            </div>            
          </div>
          <div className='w-[340px]'>
            <div className='bg-white border border-slate-900 shadow-lg shadow-slate-200/40 rounded-lg' >
              <div className='p-3' >
                <DayPicker 
                captionLayout='dropdown-buttons'
                mode = 'range'
                selected={dateRange}
                onSelect = {handleDayClick}
                pagedNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* view travel modal  */}
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
        <ViewTravelStory
        storyInfo = {OpenViewModal.data ||null}
        onClose={()=>{
          setOpenViewModal((prevState)=>({...prevState,isShown:false}));
          
        }}
        onEditClick={()=>{
          setOpenViewModal((prevState)=> ({...prevState,isShown:false}));
          handleEdit(OpenViewModal.data || null)
        }}
        onDeleteClick={()=>{
          deleteTravelStory(OpenViewModal.data ||null);
        }}
        />
        
      </Modal>





      {/*add & edit Travel Story Modal  */}
      <Modal
      isOpen = {openAddEditModal.isShown}
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

        <AddEditStory 
        storyInfo = {openAddEditModal.data}
        type = {openAddEditModal.type}
        onClose = {()=>{
          setOpenEditModal({isShown:false,type:"add",data:null});
        }}
        getAllTravelStories = {getAllStories} 
        />
        
      </Modal>


      <button 
      className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10 ' 
      onClick={()=>{setOpenEditModal({isShown:true,type:"add", data:null})}}>
        <MdAdd className='text-[32px] text-blaclk' />
      </button>
      <ToastContainer  />

    </div>
  )
}

export default Home   