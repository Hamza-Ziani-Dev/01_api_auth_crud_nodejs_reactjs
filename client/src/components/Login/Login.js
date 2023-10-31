import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import axios from "axios";

function Login() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  // const [_,setCookies] = setCookies(['token_access']);
  const navigate = useNavigate()

  const onSubmitLogin = async (e)=> {
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/auth/login", {username, password})
    console.log(res.data);
    // setCookies('token_access', res.data.token);
    // window.localStorage.setItem("userID", res.data.AdminID);
    navigate('/')
  }
  // useEffect(()=>{
  //        await 
  // },[]);

  return (
    <>
    <div className="container col-md-4">
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={onSubmitLogin}>
          <input type="text" className="input" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <button className="form-btn">Login</button>
        </form>
      </div>
    </div>
  </>
  )
}

export default Login