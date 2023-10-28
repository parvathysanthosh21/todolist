import { useReducer, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


const todoReducer = (todos, action) =>{
  switch (action.type) {
    case "ADD-TODO":
      return [...todos, {id: uuidv4(), text: action.payload, completed: false},
      ]
      case "DELETE-TODO":
        return todos.filter((item)=>item.id !== action.payload)
        case "EDIT-TODO":
        return todos.map((item)=>item.id === action.payload.id ? {...item, text: action.payload.text}
        : item
        )
  
    default:
      break;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer,[])
  const [newTodo, setNewTodo] = useState('')
  const [isEditing, setIsEditing] = useState(null)

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(newTodo){
      if (isEditing) {
        dispatch({
          type: "EDIT-TODO" , 
          payload: {id: isEditing.id, text: newTodo}})
          setIsEditing(null)
      }else{
        handleAdd()
      }
      setNewTodo("")
    }
    }
   
// add new todo
  const handleAdd =()=>{
    dispatch({type: "ADD-TODO", payload: newTodo})
    setNewTodo("")
  }

  // delete todo
  const handleDelete = (id)=>{
    dispatch({type: "DELETE-TODO", payload: id})
  }
  
  // edit todo
  const handleEdit = (item)=>{
    setNewTodo(item.text)
    setIsEditing(item)
  }
  return (
    <>
    <div>
      <h1 className='text-4xl m-16 font-bold text-teal-500 text-center'>LET'S ADD TODO</h1>
    </div>
     <form className='max-w-lg w-full mt-10 mx-auto'>
      <div className="flex items-center gap-4 border shadow rounded border-blue-300 mt-4 p-3 ">
        <input value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} className='py-3 px-5 w-full rounded-md text-black outline-none' placeholder='Enter Your ToDo...' type="text" />
        <span onClick={handleSubmit} className='py-3 px-5 cursor-pointer w-1/2 font-semibold bg-teal-300 rounded-md text-center'>Add todo</span>
      </div>
       <ul className='flex flex-col gap-4 mt-10'>
        {todos.length<=0 && (
          <div className='text-teal-400 font-bold text-center'>THERE IS NO TODOS HERE!!!</div>
          )}
        { todos.map((item,index)=>(
         <div>
            <li key={item.id} className='flex items-center mt-3 justify-between'>
            <div className='flex items-center gap-3'>
              <span>{index+1}</span>
            <span className='text-black text-xl'>{item.text}</span>
            </div>
            <div className='flex items-center gap-4'> 
            <span onClick={()=>handleEdit(item)} className='w-6 h-6 cursor-pointer flex items-center justify-center  text-emerald-400 rounded-full'>
              <i class="text-2xl fa-regular fa-pen-to-square"></i>
              </span>
            <span onClick={()=>handleDelete(item.id)} className='w-6 h-6 cursor-pointer flex items-center justify-center text-rose-600 rounded-full'>
              <i class="text-2xl fa-solid fa-trash"></i>
              </span>
            </div>
          </li>
         </div>
        ))
        }
       </ul>
     </form>
    </>
  );
  }

export default App;