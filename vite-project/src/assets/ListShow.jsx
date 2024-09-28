/* eslint-disable react/prop-types */

import axios from 'axios';
import {useEffect} from 'react'

export default function ListShow({ todoList, setTodoList}) {

  const showTodos = async() => {
    try{
      const response = await axios.get("http://localhost:8080/show");
      setTodoList(response.data);
    }
    catch(err){
      console.log(err);
    }
     
  }

  const isDone = async(id) => {

    try{
      await axios.put(`http://localhost:8080/cmpltupdt/${id}`);
      const response = await axios.get("http://localhost:8080/show");
      setTodoList(response.data);
    }
    catch(err){
      console.log(err);
    }
    
    
  }

  const handleDestroy = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      console.log(response.data);
      setTodoList(prevTodoList => prevTodoList.filter(todo => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showTodos();
  },[todoList]);
  
  return (
    <div>
      <div className="dissplay">
      <ol>
          {todoList.length > 0 ? (
            todoList.map((task, index) => (
              <li key={index}>
                <div className="list-item">
                  <div className="task-details">
                    <b style={{textDecoration: task.completed ? "line-through" : "none"}}>{task.title}</b>
                    <p className="description">Description: {task.desc}</p>
                    <p className="due-date">
  Due Date: {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
</p>
                  </div>
                  <button className="delete-button" onClick={() => handleDestroy(task._id)}>-</button>
                  <button onClick={()=>{isDone(task._id)}}>Done</button>
                </div>
              </li>
            ))
          ) : (
            <h3>No Records</h3>
          )}
        </ol>
      </div>
      
      </div>
    
  );
}