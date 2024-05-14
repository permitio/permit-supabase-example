import { useState , useEffect, useRef} from 'react'
import '../App.css'
import { jwtDecode } from "jwt-decode";

export default function Todo({supabase}) {

  const [todoList , setTodoList] = useState([]);
  const [session , setSession] = useState(null);
  const [email , setEmail] = useState(null);
  const [id , setId] = useState(null);
  const [creatingState , setCreatingState] = useState();
  const [updatingTodo , setUpdatingTodo] = useState({id : null });
  const [deletingState , setDeletingState] = useState();
  const [refreshTodoData , setRefreshTodoData] = useState();

  const inputRef = useRef();
  const todoRef = useRef();
  const editTodoRef = useRef();

//   useEffect(() => {
//     getUserData();
//   } , [])
  

//   async function getUserData () {

    
//     const { data: users, error } = await supabase.from("profiles").select("*");

//     console.log(users , error);
//   };

//   useEffect(() => {

//     getTodoData();
      
//   }, [refreshTodoData]);

//   useEffect(() => {

//     const session = localStorage.getItem("session");
//     if(session) setSession(session);
//     console.log(session , 'session');

//   } , []);

//   useEffect(() => {
//     if(session){
//       const decoded = jwtDecode(session);  
//       setId(decoded.sub);  
//       setEmail(decoded.email)
//       console.log(decoded);
//       console.log(decoded.email);
//     }
//   } , [session]);
  
//   async function logout(){
//     const { error } = await supabase.auth.signOut()
//     console.log(error);

//     localStorage.removeItem("session");
//     setSession(null);

//   }

//   async function getTodoData(){
          
            
//       let { data: TODOS, error } = await supabase
//       .from('TODOS')
//       .select('*')

      
//       setTodoList(TODOS);

//       console.log(error);
//       console.log(TODOS);
//       return ;              
//   }

//   async function createTodo(todo){


//     if(todo.trim() !== ""){

//       const res = await fetch(`http://localhost:3000/check-permission/${id}/create`)
    
//       const response = await res.json();
//       if(response.status === "permitted"){
//           setCreatingState(true);
//           inputRef.current.value = "creating...";
        
//         const { error } = await supabase
//         .from('TODOS')
//         .insert({ todo : todo})

//         console.log(error);
//         if(!error){
//           inputRef.current.value = "";
//           setCreatingState(false);
//           setRefreshTodoData(true);
//         }
//       }
  
//     }

//   }

//   async function markAsDone(todo_id){
      
//       const res = await fetch(`http://localhost:3000/check-permission/${id}/update`)
      
//       const response = await res.json();
//       if(response.status === "permitted"){
        
//         const { error } = await supabase
//         .from('TODOS')
//         .update({ isdone: true })
//         .eq('id', todo_id);


//         console.log(error);
//         if(!error){
//           setRefreshTodoData(true);
//         }
//       }
//   }

//   async function editTodo(todo_id){
      
//       const res = await fetch(`http://localhost:3000/check-permission/${id}/update`)
        
//         const response = await res.json();
//         if(response.status === "permitted"){
          
//           todoRef.current.value = "";
//           setUpdatingTodo({id : todo_id});
          
//         }
//   } 

//   async function saveChanges(todo_id , todo_value){
//         const { error } = await supabase
//           .from('TODOS')
//           .update({ todo : todo_value})
//           .eq('id', todo_id);


//           console.log(error);
//           if(!error){
//             setUpdatingTodo({id : null});
//             setRefreshTodoData(true);
//           }
//   }


//   async function deleteTodo(todo_id){
      
//       const res = await fetch(`http://localhost:3000/check-permission/${id}/delete`)
      
//       const response = await res.json();
//       if(response.status === "permitted"){
        
//         const { error } = await supabase
//         .from('TODOS')
//         .delete()
//         .eq('id', todo_id);


//         console.log(error);
//         if(!error){
//           setRefreshTodoData(true);
//         }
//       }
//   }


  return (
    <>
          <section className='main-container'>
            <section className='header'>
                <span className='logo'>TODO ORG</span>
                {session && email ? 
                  <section className='row '>
                    <span className='rounded email'>{email.slice(0, 2 )}</span>
                    <span className='auth-ops' onClick={() => {
                      logout();
                    }}>Logout</span>
                  </section>
                : 
                 <section className='auth' onClick={() => {window.location = "/auth"}}>
                    <span className='auth-ops'> sign up </span>
                </section>
                }
            </section>
            <section className='input-container'>
                <input ref={inputRef} type='text' className='textbox' placeholder='ENTER TODO ITEM' ></input>
                <button className='create-btn' onClick={() => {
                  createTodo(inputRef.current.value);
                }}>+</button>
            </section>
            <section className='todoList'>
                {todoList && todoList.length !== 0 ? 
                todoList.map((todo) => {

                  return  (
                    <section className='todo-container'>
                        <section className='todos'>
                          <section className='row'>
                              <span onClick={() => {markAsDone(todo.id)}}><input type="checkbox" checked={todo.isdone ? true : false}/></span>
                              <span className='todo-data' ref={todoRef} style={todo.isdone ? {textDecoration : "line-through"} : {}}>
                                {updatingTodo.id !== todo.id ? todo.todo : null }  
                              </span>
                              {updatingTodo.id === todo.id ? <span className='todo-data' ><input type="text" ref={editTodoRef}/> <button className='todo-ops' onClick={() => {
                                saveChanges(todo.id , editTodoRef.current.value);
                              }}>done</button></span> : null}
                          </section>
                        
                        <section className='row-todo-ops'>
                          <span className='todo-date'>
                            {todo.created_at.slice(0 , 10)}
                          </span>
                          <section className='row '>
                              {!todo.isdone ? 
                              <span className='todo-ops' onClick={() => {
                                editTodo(todo.id)
                              }}>Edit</span> 
                              : 
                              null}
                              <span className='todo-ops' onClick={() => {deleteTodo(todo.id)}}>Delete</span>
                          </section>
                        </section>
                      </section>
                    </section>
                  )
                })
               : null}
            </section>
          </section>
        </>
)}