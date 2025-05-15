import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { useGlobalContext } from '../Context/GlobalContext';
import Layout from '../layouts/Layout';
import { useState } from 'react';
import AddProjectModel from '../components/AddProjectModel';
import axios from 'axios';
import { deleteProject } from '../Api';
import { confirmDelete } from '../components/confirmDelete';
function ProjectPage() {
    //   extract projectData from context
     const{ projectData,user,setProjectData } = useGlobalContext();
    const[flag,setFlag]=useState(false);
    const[isEdit,setIsEdit]=useState(false);
    const[projectObject, setProjectObject]=useState({});

    const openModel=()=>{
        setFlag(true)
    }
    const handleClose=()=>{
        setFlag(false)
        setIsEdit(false)
        setProjectObject({})
    }
    const onEdit=(project)=>{
        setProjectObject(project)
        setFlag(true)
        setIsEdit(true)
      }
    //   delete function for project
    const onDelete=async (id)=>{
         const isConfirmed = await confirmDelete();
             if(!isConfirmed){
                return;
             }
        try{
            const response=await deleteProject(id);
           
            if(response.status===201 || response.status===200){
                console.log(response)
                const filteredData=projectData.filter((project)=>project._id!==id);
                setProjectData(filteredData);
               
            }
        }
        catch(error){
              console.log(error)
        }
        
    }

    
    return (
        <Layout>
        <div className="bg-gray-100 h-min-screen h-[100vh]">
              {
                flag && <AddProjectModel isEdit={isEdit} project={projectObject} isOpen={openModel} onClose={handleClose}/>
              }
            
            <div className='md:w-[70%] w-full  mx-auto grid md:grid-cols-2 grid-cols-1  py-2 py-4 '>
                   <h1 className='md:text-2xl text-2xl text-center py-3 text-gray-600 md:text-left font-semibold'>PROJECT OVERVIEW</h1>
                   <div className='mx-auto md:mx-0'>
                         <button onClick={openModel} onClose={handleClose} className='bg-blue-600 md:float-right border-none text-md md:text-lg px-2 text-white rouneded-md py-2 md:py-2 md:px-2 shadow-md'>Add Project</button>
                   </div>
                  
            </div>
              
              <div className='grid md:grid-cols-2 grid-cols-1 mx-auto w-[70%] gap-4 '>
               
           {
                   projectData.map((project,index)=>{
                return<ProjectCard
                key={index}
                title={project.title}
                description={project?.description}
                status={project.status}
                members={[
                    { name: 'Anna', avatar: 'https://i.pravatar.cc/150?img=5' },
                    { name: 'John', avatar: 'https://i.pravatar.cc/150?img=6' },
                    { name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=7' },
                    { name: 'Nina', avatar: 'https://i.pravatar.cc/150?img=8' },
                ]}
                onView={() => console.log('Viewing project')}
                onEdit={() => onEdit(project)}
                onDelete={() => onDelete(project._id)}
                
            />
            })
           }
            
            
            

        </div>
             {
                projectData.length===0 && <p className='text-center mt-40 mx-auto  text-3xl text-gray-600'>There is no Project Added Please add Your Projects First !!</p>
             }
        </div>
        </Layout>
       
    );
}

export default ProjectPage;