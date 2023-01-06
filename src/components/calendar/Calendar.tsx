import React, { useState } from 'react'
import * as datefns from "date-fns"
import "../calendar/Calendar.css"
import PopUp from "../popup/PopUp"

const Calendar: React.FC = () => {

  const formatOfYear = 'yyy';
  const formatOfMonth = 'MMM';
  const formatOfWeek = 'eee';
  const formatOfDay = 'd';
  const today = new Date();
  const [date, setDate] = useState<any>()
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopUp, setPopUp] = useState(false);
  const firstDay = datefns.startOfMonth(currentDate);
  const lastDay = datefns.lastDayOfMonth(currentDate);
  const weekendFirstDate = datefns.startOfWeek(firstDay);
  const weekendLastDate = datefns.lastDayOfWeek(lastDay);

  const tooglePopUp = (date: Date) => {
    
    setPopUp(true);
    setDate(date)
  }

  const hidePopUp = () => {
    setPopUp(false);
  }

  const totalDates = datefns.eachDayOfInterval(
    { start: weekendFirstDate, end: weekendLastDate }
  );
  
  const weeks = ((date) => {
    const weeks = [];
    for (let day = 0; day <= 6; day++) {
      weeks.push(date[day]);
    }
    return weeks;
  })(totalDates);

  const isToday = (day: Date) => datefns.isSameDay(day, today);

  return (
    <>
      <div className=" container-fluid">
        <div className="row align items-center">
          <div className="box col-md-8">
            <div className="box_style"
              style={{ display: "flex",
              justifyContent: "space-around"
              }}>
              <i className="bi bi-chevron-double-left p-2"
               onClick={() => setCurrentDate(datefns.subMonths(currentDate, 1))}>
              </i>
              <span className='top p-2'>
                {datefns.format(currentDate, formatOfMonth)}&nbsp;
                {datefns.format(currentDate, formatOfYear)}
              </span>
              <i className="bi bi-chevron-double-right p-2"
                 onClick={() => setCurrentDate(datefns.addMonths(currentDate, 1))}>
              </i>
            </div>
            <div className='week p-2'
              style={{ display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "1rem" 
              }}>
              {weeks.map((week) => (
                <span>{datefns.format(week, formatOfWeek)}</span>
              ))}

              {totalDates.map((date) => {

                return (
                  <span style={{
                    color:
                      !datefns.isSameMonth(date, currentDate) ? "#ddd" :
                      isToday(date) ? "green" :
                      datefns.isWeekend(date) ? "red" :
                      " "
                    }}
                    onClick={() => tooglePopUp(date)} >
                    {datefns.format(date, formatOfDay)}
                  </span>
                )
              })}

              {showPopUp && <PopUp hidePopUp={hidePopUp} date={date} />}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar;

