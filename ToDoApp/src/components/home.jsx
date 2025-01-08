import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
    const [todos, setTodos] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    })

    const handleEdit=(id)=>{
        axios.put('http://localhost:3000/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    const handleDelete=(id)=>{
        axios.delete('http://localhost:3000/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="home">
       <h2>ToDo List..</h2>
       <Create/>
       {
       todos.length === 0
       ?
       <div><h2>No Records</h2></div>
       :
       todos.map(todo => (
        <div className="task">
        <div onClick={()=>handleEdit(todo._id)} className="checkdiv">
                {todo.done ? <span className="check">&#x2611;</span> 
               : <span className="check">&#x2610;</span> 
            }</div>
            <p className={todo.done ? "line-through" : ""}>{todo.task}</p>

            <div><span className="deletebox" onClick={()=>handleDelete(todo._id)}>&#x2716;</span></div>
        </div>
       ))
    }
    </div>
  );
};

export default Home;