import '../App.css'
import { useState, useEffect , useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'

export default function Auth() {
  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

  const AuthHeader = import.meta.env.VITE_AUTH_HEADER_SUPBASE;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error , setError] = useState(null);
  const [activeTab , setActiveTab] = useState("signup")
  const activeStyle = {
    backgroundColor : "#e2e2e3"
  }
  const navigate = useNavigate();
  

  // const signup = async (email , password) => {
    
  //   const { data, error } = await supabase.auth.signUp({
  //     email: email ,
  //     password: password ,
  //     options: {
  //       emailRedirectTo: 'http://localhost:5173/',
  //     },
  //   })

  //   if(data.session) {
     
  //     try{

  //       const res = await fetch("http://127.0.0.1:54321/functions/v1/createUser" , {
  //               mode: "cors",
  //               method: "POST",
  //               headers: {
  //                   "Content-Type" : "application/json",
  //                   "Authorization" : `Bearer ${AuthHeader}`
  //                 }, 
  //               body : JSON.stringify({
  //                   data: {
  //                       user : {
  //                           id : data.user.id,
  //                           email : data.user.email
  //                   }}
  //               })
  //       })
          
       
        
  //       const response = await res.json();

  //       if(res.status === 200){
  //           localStorage.setItem("session" , data.session.access_token)
  //           navigate('/');
  //       }else{
  //         setError(response.error);
  //       }
  //     }catch(err){
  //       setError(err);
  //     }
      
  //   };
    
  // }

  // const signin = async (email , password) => {
    
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   })

  //   if(data.session) {
      
  //     localStorage.setItem("session" , data.session.access_token)
  //     navigate('/');
  //   };
    
  // }

  // useEffect(() => {

  //   if(localStorage.getItem("session")) navigate('/');

  // } , [])

  
  return (
    <section className='auth-container'>
          <section className='switch-auth'>
            <section className='sign-option'>
              <span className='sign-tab'style={activeTab === "signin" ? activeStyle : null} onClick={() => {setActiveTab("signin")}}>sign in </span>
              <span className='sign-tab'style={activeTab === "signup" ? activeStyle : null} onClick={() => {setActiveTab("signup")}}>sign up</span>
            </section>
            {activeTab === "signup" ? 
              <section className='sign-box'>
                <input className='email-box' ref={emailRef} type="email" placeholder='email' required/>
                <input className="password-box" ref={passwordRef} type="password" placeholder='password' required />
                <button className="submit-btn"  type="submit" onClick={() => {
                  // if(emailRef.current.value && passwordRef.current.value) signup(emailRef.current.value , passwordRef.current.value)
                }}>
                  Sign up
                </button>
                <span className="sign-anchor" onClick={() => {
                  setActiveTab("signin")
                }}>already have an account ? signin</span>
                {/* { error ? <span style={{padding: "20px 20px 10px 20px" , fontSize: "13px" , color : "red"}}>{String(error) } ! please try again</span> : null} */}
              </section>
              : 
              
              <section className='sign-box'>
                <input className='email-box' ref={emailRef} type="email" placeholder='email' required/>
                <input className="password-box" ref={passwordRef} type="password" placeholder='password' required />
                <button className="submit-btn" type="submit" onClick={() => {
                  // if(emailRef.current.value && passwordRef.current.value) signin(emailRef.current.value , passwordRef.current.value)
                }}>
                  Sign in
                </button>
                <span className="sign-anchor" onClick={() => {
                  setActiveTab("signup")
                }}>already have an account? signup</span>
              </section>
              
            }
          
          </section>
    </section>
  )
}
