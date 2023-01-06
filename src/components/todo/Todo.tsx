import { format } from "date-fns/esm";
import { useReducer } from "react";
import { useState } from "react";
import "../todo/Todo.css"

export const ACTION = {
    ADD_TODO: "add-todo",
    DELET_TODO: "delete-todo",
  };
  
  const reducer = (todos:any, action:any) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        return [...todos, newTodo(action.payload.name, action.payload.date+1)];
      case ACTION.DELET_TODO:
        return todos.filter((todo:any) => todo.id !== action.payload.id);
      default:
        return todos;
    }
  };
  const newTodo = (name: string, date: Date) => {
    return { id: Date.now(), name: name, complete: false, Dates:date};
  };
  
  function Todo  (props: { date: Date}) {

    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");
    let dte= format(props.date,'dd/MM/yyy')

    const handlesubmit = (e : React.FormEvent) => {
      e.preventDefault();
      dispatch({ type: ACTION.ADD_TODO, payload: { name: name, date: dte } });
      setName("");
      localStorage.setItem(dte,(JSON.stringify(todos)))  
    };

    const item =JSON.parse((localStorage.getItem(dte|| ""))|| "")
 
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
              {item
               .map((todo:any, id:number) => {
                return <TodoList key={id} todo={todo} dispatch={dispatch} todos={todos} />;
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
        <span style={{ color: props.todo.complete ? "red" : "#000" ,marginRight:10}}>{props.todo.name}</span>
         <i className="bi bi-trash3"
          onClick={()=>props.dispatch({type:ACTION.DELET_TODO,payload:{id:props.todo.id}})} >delete</i> 
      </div>
    );
  };

