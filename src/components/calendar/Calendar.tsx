import React, { useState } from 'react'
import * as datefns from "date-fns"
import "../calendar/Calendar.css"
//import { IDetails } from '../properties/Properties'

const Calendar : React.FC= () => {

    const formatOfYear  = 'yyy';
    const formatOfMonth = 'MMM';
    const formatOfWeek  = 'eee';
    const formatOfDay   = 'd';

    const today = new Date(); 

    
    const [currentDate, setCurrentDate] = useState(new Date());
   // console.log(currentDate);

   const [selectedDate, setSelectedDate] = useState(new Date());

   const firstDay = datefns.startOfMonth(currentDate);
    //console.log(firstDay);

    const lastDay = datefns.lastDayOfMonth(currentDate);
    //console.log(lastDay);

    const weekendFirstDate = datefns.startOfWeek(firstDay);
    //console.log(weekendFirstDate);

    const weekendLastDate = datefns.lastDayOfWeek(lastDay);
   // console.log(weekendLastDate);

   const intervals = datefns.eachDayOfInterval(
    { start : weekendFirstDate, end : weekendLastDate}
    );
   console.log(intervals);
   
   const weeks = ((date)=>{
    const weeks = [];
    for( let day =0; day<=6; day++){
        weeks.push(date[day]);
    }
    return weeks;
})(intervals);

const isToday = (day:Date)=> datefns.isSameDay(day, today);
const isSelectedDate = (day:Date) =>datefns.isSameDay( day,selectedDate);

  return (
   <>
   <div className=" container-fluid">
        <div className="row align items-center">
          <div className="box col-md-8">

          <div className="box_style"
             style={{ display: "flex", justifyContent: "space-around"}}>
             <i className="bi bi-chevron-double-left p-2"
             onClick={()=> setCurrentDate(datefns.subMonths(currentDate, 1))}>
             </i>
             <span className='top p-2'>
             {datefns.format(currentDate, formatOfMonth)}&nbsp;
             {datefns.format(currentDate, formatOfYear)}
             </span>
             <i className="bi bi-chevron-double-right p-2"
             onClick={()=> setCurrentDate(datefns.addMonths(currentDate, 1))}>
             </i>
         </div>
                <div className='week p-2'
                 style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap:"1rem"}}>
                  {weeks.map((week)=>(
                    <span>{datefns.format(week, formatOfWeek)}
                    </span>
                   ))}
                    {intervals.map((date)=>(

                 <span style={{ color:  
                 !datefns.isSameMonth(date, currentDate)? "#ddd" :
                 isSelectedDate(date)? "blue":
                 isToday(date)? "green":
                 datefns.isWeekend(date)? "red":
                 ""}}
                 onClick = {()=> setSelectedDate(date)}
                 >
                {datefns.format(date, formatOfDay)} 
                </span>
               
                 ))}
              
                </div>
          </div>
        </div>
    </div>
   </>
  )
}

export default Calendar;

