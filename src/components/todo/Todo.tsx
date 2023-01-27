import { useReducer } from "react";
import { useState } from "react";
import "../todo/Todo.css"

export const ACTION = {
    ADD_TODO: "add-todo",
    DELETE_TODO: "delete-todo",
  };
  
  const reducer = (todos:any, action:any) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        return [...todos, newTodo(action.payload.name, action.payload.date)];
      case ACTION.DELETE_TODO:
        return todos.filter((todo:any) => todo.id !== action.payload.id);
      default:
        return todos;
    }
  };
  const newTodo = (name: string, date: Date) => {
    return { id: Date.now(), name: name, complete: false, Dates:date};
  };
  
  function Todo  (props:Props) {

    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");
    //let dte = datefns.format(props.date, 'dd-MM-yyyy')
    const handlesubmit = (e : React.FormEvent) => {
      e.preventDefault();
      dispatch({ type: ACTION.ADD_TODO, payload: { name: name, Date: props.date } });
      localStorage.setItem(JSON.stringify(props.date,),JSON.stringify(todos))
      setName("");
    };

      const item = localStorage.getItem(JSON.stringify(props.date ||""))
      const list =item? JSON.parse((item || "")):todos
     //const item = JSON.parse((localStorage.getItem(JSON.stringify(props.date||"")))||"")
   // const item = JSON.parse((localStorage.getItem(dte || ""))||"")
    console.log(list);
    //const item =JSON.parse((localStorage.getItem(props.date|| ""))|| "")
 //console.log(todos)
    return (
      <div className="App">
        <div>
          <div className="title">
          <i className="bi bi-list-task">
          </i>&nbsp;
          Add your List</div>
  
          <form onSubmit={handlesubmit}>
            <input
              className="form-label"
              placeholder="..."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
  
          <div>
            <div style={{ marginTop: "50px" }}>
              {list.filter((val:any)=>{
                if(val.date===list.date){
                  console.log(val.name)
                  return val.name;
                }
                return val;
                })
               .map((todo:any) => {
                return <TodoList key={todo.id} todo={todo} dispatch={dispatch} />;
               }) }
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Todo;

  const TodoList = (props:any) => {
    
    return (
      <div className="base">
        <span style={{ marginRight:10}}>{props.todo.name}</span>
         <i className="bi bi-trash3"
          onClick={()=>props.dispatch({type:ACTION.DELETE_TODO,payload:{id:props.todo.id}})} >delete</i> 
      </div>
    );
  };
  interface Props{
    date: Date;
  }
