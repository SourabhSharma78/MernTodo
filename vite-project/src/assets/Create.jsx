import axios from 'axios';


const Create = ({todo,setTodo,todoList,setTodoList}) => {
    
    const handleTask = () => {
       
      const newTask = {
        title : todo.title,
        description : todo.desc,
        dueDate : todo.dueDate
      };
      
      axios.post("http://localhost:8080/add" , newTask)
       .then(result => {console.log(result.data.message);
        setTodoList([...todoList , todo]);
       setTodo({title : "" , desc : "" , dueDate : "" });
       })
       .catch(err => {console.log(err);});
    }

  return (
    <div className="create-box">
      <div><h1> TO-DO LIST </h1></div>
      <div className='create'>
        <input 
        type="text" 
        placeholder='Enter Title' 
        name='title' 
        onChange={(e)=>{let title = e.target.value; setTodo({...todo,title})}}
        value={todo.title}
        required />

        <input 
        type="text" 
        placeholder='Enter description'   
        name='desc' 
        onChange={(e)=>{setTodo({...todo,desc:e.target.value})}} 
        value={todo.desc} 
        required/>

        <input 
        type="date"  
        placeholder='Enter duedate'  
        name='dueDate' 
        onChange={(e)=>{setTodo({...todo,dueDate : e.target.value})}} 
        value={todo.dueDate}
        required />
        <button type='button' onClick={handleTask}>+</button>
      </div>
    </div>
  );
};

export default Create;