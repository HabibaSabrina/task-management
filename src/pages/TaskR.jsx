import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react'

import Swal from 'sweetalert2';

const TaskR = () => {
    const [userTasks, setUserTasks] = useState([]) 
    useEffect(() =>{
        fetch('https://task-management-application-habibasabrina.vercel.app/tasks', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setUserTasks(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },[userTasks])
    const updateData = (newValue, id) =>{
      
        const status = { status: newValue };

        fetch(`https://task-management-application-habibasabrina.vercel.app/tasks/${id}`,{
            method:'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
        .then(res => res.json())
        .then(data =>{
            
            if(data.modifiedCount>0){
                Swal.fire('Success', 'Feedback has been sent successfully!', 'success');
                const remaining = userTasks.filter(task => task._id !==id)
                setUserTasks(remaining)
                
            }
        })
    }
    const handleUpdate = (theClass) => {
      
 
        Swal.fire({
            title: 'Update the status',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Send',
          }).then((result) => {
            
            if (result.isConfirmed) {
              const newValue = result.value;
              updateData(newValue, theClass._id);
            }
          });
    }
  
    const handleTaskDelete = _id =>{
        fetch(`https://task-management-application-habibasabrina.vercel.app/tasks/${_id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount>0){
                Swal.fire("The Task is deleted successfully")
                const remaining = userTasks.filter(task => task._id !==_id)
                setUserTasks(remaining)
            }
        })
    }
    return (
        <div >
            <div className="overflow-x-auto w-full mt-20">
                <table className=" my-5 w-10/12 mx-auto">
                    <thead className='bg-green-300 text-red-800'>
                        <tr >
                            <th className='py-5'>Task Name</th> 
                            <th className='py-5'>Description</th> 
                            <th className='py-5'>status</th>
                            <th className='py-5'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           
                            userTasks.map(task => <tr key={task._id} className='font-semibold text-center border-b-2 border-green-200 bg-[#f3f9f6]'>
                           
                            <td>{task.taskName}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            
                            <td className='py-3'><button onClick={() => handleUpdate(task)} className='p-3 mr-5  bg-green-500 hover:bg-green-800  font-semibold text-white rounded-full'>Update</button>
                            <button onClick={() => handleTaskDelete(task._id)} className='p-3 mr-5 bg-green-500 hover:bg-green-800  font-semibold text-white rounded-full'>Delete</button></td>
                        </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default TaskR;