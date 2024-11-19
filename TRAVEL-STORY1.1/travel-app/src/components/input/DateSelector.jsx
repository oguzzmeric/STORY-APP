import React, { useState } from 'react'
import { MdOutlineDateRange , MdClose } from 'react-icons/md'
import {DayPicker} from "react-day-picker";
import moment from "moment";


export const DateSelector = ({date,setDate}) => {
  const [openDatePicker,setOpenDatePicker] = useState(false);

  return (
    <div>
      <button className='inline-flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 rounded' onClick={()=>{setOpenDatePicker(true)}}>
        <MdOutlineDateRange className='text-lg' />
        {date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY")}
      </button>

      { openDatePicker && 
      (
        <div className="  overflow-y-scroll p-2 bg-sky-50/80 rounded-lg relative pt-9 " >
        
        <button className='w-10  h-10 rounded-full flex items-center justify-center bg-sky-400 hover:bg-sky-900 absolute top-2 right-2 ' 
        onClick={()=>{setOpenDatePicker(false)}} ><MdClose  /></button>
        <DayPicker className="text-slate-900" captionLayout='dropdown-buttons' mode='single' selected={date} onSelect={setDate} pagedNavgiation />
        </div>
      )}
    </div>
  )
}
