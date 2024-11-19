

import React, { useEffect, useRef, useState } from 'react'
import{FaRegFileImage} from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';


const ImageSelector = ({ Image , setImg , handleDeleteImage}) => {

    const inputRef = useRef(null);
    const [previewUrl,setpreviewUrl] = useState(null);

    const handleImage = (event) =>{
        const file = event.target.files[0];
        console.log("file:"+file);
        if(file){
            setImg(file);
        }

    };

    const onChooseFile = () => {
        inputRef.current.click();
        console.log("input ref"+inputRef)

    }

    const handleRemoveImage = () => {
        setImg(null);
        handleDeleteImage();
    }


    useEffect(() => {
        if (typeof Image ==="string"){
            setpreviewUrl(Image);
        }else if(Image){
            setpreviewUrl(URL.createObjectURL(Image));
        }else{
            setpreviewUrl(null);
        }
        return () =>{
            if(previewUrl && typeof previewUrl === "string" && !Image){
                URL.revokeObjectURL(previewUrl);
            }
        }
    },[Image]);

  

  return (
    <div>
        <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImage}
        className='hidden' />

        {!Image ? (  
        <button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-300 rounded border border-slate-500 ' 
        onClick={()=>onChooseFile()} >
            <div className='w-14 h-14 flex items-center justify-center bg-cyan-300 rounded-full border border-cyan-300' >
                <FaRegFileImage className='text-xl text-cyan-500' />
            </div>
            <p className='tsxt-sm text-slate-500' >Browse image files to upload</p>
        </button> 
        ) : (
            <div className='w-full relative' >
                <img src={previewUrl} alt='Selected' className='w-full h-[300px] object-cover rounded-lg ' />
                <button 
                className='btn-small btn-delete absolute top-2 right-2' 
                onClick={handleRemoveImage} 
                >
                    <MdDeleteOutline className='text-lg' />
                </button>
            </div>
        )}
    </div>
  );
};

export default ImageSelector

