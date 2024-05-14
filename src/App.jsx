import './App.css'
import Auth from './auth/auth';
import Todo from "./todo/todo";
import { BrowserRouter , Routes , Route, redirect } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL , import.meta.env.VITE_SUPABASE_KEY)

function App() {

  return(
    <>
          <BrowserRouter basename="/">
          <Routes>
            <Route path='/' element={<Todo supabase={supabase}></Todo>} />
            <Route path="/auth" element={<Auth supabase={supabase}></Auth>}/> 
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App