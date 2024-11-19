import React, { useState } from 'react';
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md';
import { DateSelector } from '../components/input/DateSelector';
import ImageSelector from '../components/input/ImageSelector';
import TagInput from '../components/input/TagInput';
import axiosInstance from '../utils/axiosInstance';
import moment from 'moment';
import { ToastContainer , toast } from 'react-toastify';
import uploadImage from '../utils/uploadImage';
import { useNavigate } from 'react-router';

  
export const AddEditStory = ({
    storyInfo, type, onClose, getAllTravelStories,
}) => {

    const [title, setTitle] = useState(storyInfo?.title || "");
    const [storyImg, setStoryImg] = useState(storyInfo && storyInfo.imageUrl ? storyInfo.imageUrl : null);
    const [story, setStory] = useState(storyInfo?.story || "" );
    const [visitedLocation, setVisitedLocation] = useState( storyInfo?.visitedLocation || []);
    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null );
    const [error, setError] = useState("");

    const updateTravelStory = async () => {
        const storyId = storyInfo._id
        console.log("storyInfo",storyInfo.imageUrl)
        try{ 
            let imageUrl = "";
            
            let PostData = {
                title,
                story,
                imageUrl: storyInfo ? storyInfo.imageUrl || "" : "",
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            };
            

             if (typeof storyImg == "object"){
                const imgUploadRes = await uploadImage(storyImg);
                imageUrl = imgUploadRes.imageUrl || "";

                PostData = {
                    ...PostData,
                    imageUrl:imageUrl,
                };
             }


            const response = await axiosInstance.put("/edit-story/"+storyId , PostData);
            console.log(response);
    
            if(response.data){
                toast.success("story has been updated");
                getAllTravelStories();
                onClose();
            }
            
    
        }catch(error){
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.message)
            }else{
                setError("error happend")
            }
        }

    }

   const addNewTravelStory = async () => {

    try{
        let imageUrl = "";
        if(storyImg){
            const imgUploadRes = await uploadImage(storyImg);
            console.log("imageupload res .imageUrl : ",imgUploadRes.imageUrl);

            imageUrl = imgUploadRes.imageUrl;
        }
        const response = await axiosInstance.post("/add-travel-story",{
            title,
            story,
            imageUrl : imageUrl,
            visitedLocation,
            visitedDate : visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
        });

        if(response.data && response.data.story){
            toast.success("added new story");
            getAllTravelStories();
            onClose();
        }

    }catch(error){
        if(
            error.response &&
            error.response.data &&
            error.response.data.message
        ){
            setError(error.response.message)
        }else{
            setError("error happend")
        }
    }

    }
    

    const handleAddOrUpdateClick = () => {
        console.log("Input data:", { title, storyImg, story, visitedLocation, visitedDate });
        if (!title) {
            setError("Please enter the title");
            return; // Hata varsa devam etmesin
        }
        if (!story) {
            setError("Please enter the story");
            return; // Hata varsa devam etmesin
        }
        setError("");

        if (type === "edit") {
            updateTravelStory();
        } else {
            addNewTravelStory();
        }
    }

    const handleDeleteStoryImg = async () => {
        // Resmi silme işlemleri burada yapılacak
        const deleteImgRes = await axiosInstance.delete("/delete-image",{
            params : {
                imageUrl : storyInfo.imageUrl
            }
        });
        console.log(deleteImgRes);
        if(deleteImgRes.data){
            const storyId = storyInfo._id

            const postData = {
                title,
                story,
                visitedLocation:moment().valueOf(),
                imageUrl : "",
            };

            //update the story

            const response = await axiosInstance.put("/edit-story/"+storyId,postData);
            setStoryImg(null);
        }

    }

    return (
        <div className='relative'>
            <div className='flex items-center justify-between'>
                <h5 className='text-xl font-medium text-slate-700'>
                    {type === "add" ? "Add Story" : "Update Story"}
                </h5>
                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg'>
                        {type === 'add' ? (
                            <button className='btn-small' onClick={handleAddOrUpdateClick}>
                                <MdAdd className='text-lg' /> Add Story
                            </button>
                        ) : (
                            <>
                                <button className='btn-small' onClick={handleAddOrUpdateClick}>
                                    <MdUpdate /> Update Story
                                </button>

                                <button className='btn-small btn-delete' onClick={onClose}>
                                    <MdDeleteOutline className='text-lg' /> Delete Story
                                </button>
                            </>
                        )}
                        <button onClick={onClose}>
                            <MdClose />
                        </button>
                    </div>
                    {error && (<p className='text-red-900' >{error}</p>) }
                </div>
            </div>

            <div>
                <div className='flex-1 flex flex-col gap-2 pt-4'>
                    <label className='input-label'>Title</label>
                    <input
                        type="text"
                        className='bg-cyan-200 text-xl text-gray-800 outline-none'
                        placeholder='A day in the Great Wall'
                        value={title}
                        onChange={({ target }) => { setTitle(target.value) }}
                    />
                    <div className='my-3'>
                        <DateSelector date={visitedDate} setDate={setVisitedDate} />
                    </div>

                    <ImageSelector 
                    Image={storyImg} 
                    setImg={setStoryImg} 
                    handleDeleteImg = {handleDeleteStoryImg}
                    />


                    <div className='flex flex-col gap-2 mt-2'>
                        <label className='input-label'>Your Story:</label>
                        <textarea
                            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                            placeholder='Story'
                            rows={10}
                            value={story}
                            onChange={({ target }) => setStory(target.value)}
                        />
                    </div>

                    <div className='pt-3'>
                        <label className='input-label'>Visited Locations</label>
                        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                    </div>
                </div>
            </div>
        </div>
    );
}
