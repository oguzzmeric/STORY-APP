import React from 'react'
import moment from 'moment/moment'
import { FaHeart } from 'react-icons/fa6'
import { GrMapLocation } from "react-icons/gr";

function TravelStoryCard({
    imgUrl,
    title,
    date,
    story,
    visitedDate,
    isFavorite,
    visitedLocation,
    onFavouriteClick,
    onClick
}) {
    return (
    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer' >
        <img src={imgUrl}
            alt={title} 
            className='w-full h-56 object-cover rounded-lg' 
            onClick={onClick} />

        <button className='w-10 h-10 flex items-center justify-center bg-white/40 rounded-xl border border-white/30 absolute top-4 right-4' 
        onClick={onFavouriteClick}
        >
        <FaHeart className={`icon-btn ${isFavorite ? "text-red-800":"text-white"}`} />
        </button>


        <div className='p-4' onClick={onClick}>
            <div className='flex items-center gap-3' >
                <div className='flex-1' >
                    <h6 className='text-xs text-slate-500' >
                    <span>
                        {date ? moment(date).format("Do MMM YYYY") : "-"}
                    </span>
                    
                </h6>
            </div>

        </div>
        </div>

        <p className="text-slate-600 m-3">{story?.slice(0,60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-200 bg-cyan-950 p-3  rounded m-3 py-2 " >
        <GrMapLocation  className='text-sm'/>
        {visitedLocation.map((item,index)=>
        visitedLocation.length == index + 1 ? `${item}` : `${item},`
        )}
        </div>
    </div>
    )
}


export default TravelStoryCard;
