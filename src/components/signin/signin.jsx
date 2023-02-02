import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "./signin.css"
import { useNavigate } from "react-router-dom";


export default function Signin()
{
  const navigate =useNavigate()
  const [email,setEmail] = useState("")
  const [password,SetPassword] = useState("")
  const SignInHandler = (e) => {
    e.preventDefault()
    console.log(email, password)
    fetch("/signIn", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                alert("Looged in Successfully")
                navigate("/home")
            }
        })
}

    return (
        <>
        <div className="container">
        <div className="signin">
        <h1>Sign In</h1><br/>
        <input type="email"  placeholder='User Id' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        <input  type="Password"  placeholder="Password"  name='password' value={password} onChange={(e)=>SetPassword(e.target.value)}/><br/>
        <button id="bt" onClick={(e)=>SignInHandler(e)}>Sign in</button><br/>
        <Link to="/Signup" >Don't have an account? Sign Up here</Link>

        </div>
        </div>
        </>
    )
}