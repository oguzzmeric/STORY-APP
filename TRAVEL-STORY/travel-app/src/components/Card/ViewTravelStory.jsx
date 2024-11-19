import moment from 'moment'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdClose, MdDelete, MdDeleteOutline, MdUpdate } from 'react-icons/md'

const ViewTravelStory = ({storyInfo,onClose ,onEditClick,onDeleteClick}) => {
  return (
    <div className='relative'>
            <div className='flex items-center justify-end'>
                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/70 p-2 rounded-l-lg' >
                        <button className='btn-small' onClick={onEditClick} >
                            <MdUpdate className='text-lg'   />Update Story
                        </button>
                        <button className='btn-delete' onClick={onDeleteClick}  >
                          <MdDeleteOutline className='text-lg' />
                        </button>
                        <button className='btn-smalll' onClick={onClose} >
                          <MdClose className='text-lg'  />
                        </button>
                    </div>
                </div>
            </div>

            <div>
              <div className='flex-1 flex flex-col gap-2 py-4' >
                <h1 className='text-2xl text-slate-700 '>
                  {storyInfo && storyInfo.title}
                </h1>
                <div className='flex items-center justify-between gap-3  text-cyan-800 bg-cyan-300' >
                  <span>
                    {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                  </span>
                  <div className='inline-flex items-center gap-2 text-cyan-300 bg-cyan-800 rounded px-2 py-1' >
                    <GrMapLocation  className='text-sm' />
                    {storyInfo && storyInfo.visitedLocation.map((item,index)=> storyInfo.visitedLocation.length == index + 1  ?  `${item}` : `${item} . ` )}
                  </div>
                </div>
                <img
                src={storyInfo && storyInfo.imageUrl}
                alt={"Selected"}
                className='w-full h-[300px] object-cover rounded-lg '
                />
                <div className='mt-4' >
                  <p className='text-sm text-slate-900 leading-6 text-justify whitespace-pre-line '  >{storyInfo.story}</p>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ViewTravelStory