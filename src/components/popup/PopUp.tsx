import React from 'react'
import "../popup/PopUp.css"
import Todo from '../todo/Todo'

const Popup = (props:Props) => {
    const closeTodo = () =>{
        props.hidePopUp()
    }
  return (
    <div className='popup'>
        <div className='close' onClick={closeTodo}>
        <i className="bi bi-x-circle"></i> 
        </div>
        <div className='content'>
          <Todo date={props.date}  />
        </div>
    </div>
  )
}

export default Popup;

interface Props{
    hidePopUp:()=>void
    date: Date;
}