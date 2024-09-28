import { useState } from 'react';
import './App.css';
import ListShow from './assets/ListShow';
import Create from './assets/Create';

export default function App (){

  const [todo,setTodo] = useState({ title: '', desc: '', dueDate: '' , completed : false});
  const [todoList,setTodoList] = useState([]);


  return (
  <>
      
      <Create todo={todo} todoList={todoList} setTodo={setTodo} setTodoList={setTodoList}/>
      <ListShow todoList={todoList} setTodoList={setTodoList} />
  </>
  );
}


