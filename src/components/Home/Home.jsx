import React, { useEffect, useState } from 'react'
import "./home.css"
import EachTask from '../EachTask/EachTask'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const username = user.email.split("@")[0]
    let [task,setTask]=useState("")
    let [tasks,setTasks]=useState([])
    let [addTask,setaddtask]=useState(false)
    let [isAnyStart,setIsAnyStart]=useState(false)
    let [completedTasks,setCompletedTasks]=useState([])
    let navigate=useNavigate()
    useEffect(()=>{
        fetch("/myActivities",{
            method:"GET",
            headers:{
                "Content-type": "application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                // console.log(typeof(data),data)
                setTasks(data)
                // tasks=data
                // console.log(tasks)
            }
        })
    },[tasks])
    function add(){
        if(!task){
            alert("please enter some Activity")
            return
        }
        setaddtask(!addTask)
        fetch("/AddActivity", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                Activity:task,
                Status:"Pending"
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    setIsAnyStart(false)
                }
            })
    }
    function logout(){
        localStorage.clear()
        navigate("/signin")
    }
  return (
    <>
    <div className='home'>
        <div className='top'>
            {username}
        </div>
        <div className='content'>
            <div className='side'>
                <b className='to-do'>To do List</b><br/>
                History<br/>
                {
                    completedTasks.map((task)=>{
                        return(
                            <p>{task.Activity}&nbsp; &nbsp; {task.TimeTaken}</p>
                        )
                    })
                }
            <button onClick={logout} className='logout'>
                Logout
            </button>
            </div>
            <div className='all'>
                <div className='add'>

               
                    <input type="text" value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="add here"/>
                <button  onClick={add}>Add New Activity</button>
                
                </div>
                <table>
                    <thead>

                    <th>Activity</th>
                    <th>Status</th>
                    <th>Time Taken</th>
                    <th>Action</th>
                    </thead>
                    {
                        tasks.map((task)=>{
                            return(
                                <>
                                <div className='conat'>
                                <EachTask task={task} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} isAnyStart={isAnyStart} setIsAnyStart={setIsAnyStart}/>                        
                                </div>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Home