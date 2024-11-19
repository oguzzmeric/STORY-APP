import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md';
import { GrMapLocation  } from 'react-icons/gr';


const TagInput = ({tags,setTags}) => {
  const[inputValue,setInputValue] = useState("");

  const addNewTag = () =>{
    if(inputValue.trim() !== "" ){
        setTags([...tags,inputValue.trim()]);
        setInputValue("")
    }
  };

  const handleInputChange = (e) =>{
    setInputValue(e.target.value)
    console.log("InputValue : "+inputValue);
  };

  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        addNewTag();
    }
  };

  const handleRemoveTag = (tagRemove) =>{
    setTags(tags.filter((tag)=> tag!== tagRemove))
  }
  
    return (
    <div>
        {tags.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2' >
                {tags.map((tag,index)=>(
                    <span 
                    className='flex items-center gap-2 text-cyan-100 bg-cyan-900 px-2 py-2 rounded' 
                    key={index}  >
                        <GrMapLocation className='text-sm'/>{tag}
                        <button onClick={()=>handleRemoveTag(tag)} > 
                            <MdClose />
                        </button>

                    </span>
                ))}
            </div>            
        )}


        <div className='flex items-center gap-4 mt-3' >
            <input type="text" 
            value={inputValue}
            className=''
            placeholder='add Location'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />
            <button className='w-8 h-8 justify-center border-cyan-300 hover:bg-cyan-800' onClick={addNewTag} >
                <MdAdd className='text-2xl text-cyan-600 hover:text-white' />
            </button>
        </div>
    </div>
  )
}

export default TagInput