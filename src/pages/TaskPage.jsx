// src/components/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TaskCard from "../components/TaskCard"
import Layout from '../layouts/Layout';
import AddTaskModel from '../components/AddTaskModel';
import { useGlobalContext } from '../Context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import { confirmDelete } from '../components/confirmDelete';
import Loader from '../components/Loader';
import { deleteTask, getAllTasks } from '../Api';
import { useParams } from 'react-router-dom';
const TaskPage = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  // get states from global context taskData contain all tasks
  const { user,  setTaskObject,  tasksData, setTasksData } = useGlobalContext();
  const [edit, setEdit] = useState(false);
 
   const{status}= useParams();
   
  console.log(status)
  const fetchTasks = async (user) => {
    const { data } = await getAllTasks();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', user.id],
    queryFn: () => fetchTasks(user),
    enabled: !!user?.id && !!user?.token, // prevent fetch if user is not ready
    refetchOnMount: true, // always fetch on mount
    refetchOnWindowFocus: true, // fetch if tab regains focus
  })

  // console.log(tasks)
  // filter data based on status 
  useEffect(()=>{
    const filteredData=status=='AllTasks'? data: data?.filter(task=>task.status.toLowerCase().includes(status.toLowerCase()));
    setTasksData(filteredData)
  },[status,data])



 
 // Implement edit functionality
  const handleEditTask = async (id) => {
    const taskArray = tasksData.filter(task => task._id === id);
    setTaskObject(taskArray[0]);
    setEdit(true)
    setModel(true)

  };

  const handleDeleteTask =async (id) => {
    // Implement delete functionality
    const isConfirmed = await confirmDelete();
     if(!isConfirmed){
        return;
     }
    try {
        // call funtion for api call
      const response=await deleteTask(id);
      if(response.status===201 || response.status===200){
          const filteredData=tasksData.filter((task)=>task._id!==id);
          setTasksData(filteredData);
      }
    }
    catch(error){
        console.log(error)
    }
    console.log(`Delete task with id: ${id}`);
  };
  const [model, setModel] = useState(false)
  const closeModel = () => {
    setModel(false)
    setTaskObject({})
    setEdit(false)
  }
  const openModel = () => {
    setModel(true)
  }
  
  
  return (
    <Layout>
      {isLoading && <Loader/>}

      <div className="min-h-screen bg-gray-100 p-6">
        {
          model && <AddTaskModel edit={edit} onClose={closeModel} onOpen={openModel} />
        }

         

        <div className="max-w-4xl mx-auto">
          <div className="flex align-items-center gap-2">

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className='md:w-40 w-36 md:text-md text-[12px] cursor-pointer hover:bg-blue-600 rounded h-12 p-3 shadow-md bg-blue-500 text-white' onClick={openModel}>ADD NEW TASK</button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            {tasksData?.filter((task) => {
              if (searchQuery == "") {
                return task;
              }
              else if (task.title?.toLowerCase().includes(searchQuery) ||
                task.description?.toLowerCase().includes(searchQuery) ||
                task.status?.toLowerCase().includes(status.toLowerCase()))
                 {
                return task;
              }
            }).map((task, index) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
                onEdit={() => handleEditTask(task._id)}
                onDelete={() => handleDeleteTask(task._id)}
              />
            ))}
          </div>
            {tasksData?.length===0 &&<p className='text-xl text-semibold text-gray-600'>You have No Task Please add your task Make sure first add project!!</p>}
        </div>
      </div>
    </Layout>
  );
};

export default TaskPage;
