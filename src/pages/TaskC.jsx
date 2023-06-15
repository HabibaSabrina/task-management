import React from 'react';
import Swal from 'sweetalert2';

const TaskC = () => {
    const handleAddTasks = event => {
        event.preventDefault()
        const form = event.target;
        const taskName = form.taskName.value;
        const status = form.status.value;
        const description = form.description.value;
        const task = {taskName, description, status}
        console.log(task)
        fetch('https://task-management-application-habibasabrina.vercel.app/tasks',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                Swal.fire('task is added successfully')
                form.reset();
            }
        })
    }
    return (
        <div>
            
            <form onSubmit={handleAddTasks} className='bg-sky-100 px-20 my-20 py-10 w-1/2 mx-auto rounded-xl'>
                <h1 className='text-center mb-20 text-3xl font-bold text-[#673c0b]'>Add a Task</h1>
                <div className='mx-36'>
                    <div>
                        <p className='font-bold text-[#673c0b]'>Task Name</p>
                        <input className='  focus:outline-0  mt-5 w-64 md:w-80 p-2 border-2 border-red-800 rounded-xl' type="text" name="taskName" required />
                    </div>
                    
                   
                    <div className='my-5'>
                        <p className='font-bold text-[#673c0b]'>Description</p>
                        <textarea className='  focus:outline-0  mt-5 w-64 md:w-80 p-2 border-2 border-red-800 rounded-xl' type="text" name="description" required />
                    </div>

                    <div>
                        <p className='font-bold text-[#673c0b]'>status</p>
                        <input className='  focus:outline-0  mt-5 w-64 md:w-80 p-2 border-2 border-red-800 rounded-xl' type="text" name="status" required />
                    </div>
                </div>
                <div className='text-center'>
                <button className='bg-[#673c0b] w-64 rounded-full p-3 text-xl text-white font-semibold hover:bg- mt-10'>Add</button>

                </div>
            </form>
        </div>
    );
};

export default TaskC;