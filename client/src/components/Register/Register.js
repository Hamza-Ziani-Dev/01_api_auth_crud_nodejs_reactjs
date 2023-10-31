import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const onSubmitRegister = (e)=> {
    e.preventDefault();
    axios.post("http://localhost:3001/auth/register", {username,password})
      .then((res) => {
              console.log('====================================');
              console.log(res.data);
              console.log('====================================');
      })
      .catch((err) => console.log(err.response.data));
  }
  return (
    <>
      <div className="container col-md-4">
        <div className="form-container">
          <p className="title">Rgister</p>
          <form className="form" onSubmit={onSubmitRegister}>
            <input type="tezt" className="input" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button className="form-btn">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
