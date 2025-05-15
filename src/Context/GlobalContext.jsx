import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getProjects } from '../Api';
// Create context
const GlobalContext = createContext();

// Create provider
export const GlobalProvider = ({ children }) => {


  //  this is for setting up task object 
  const [taskObject, setTaskObject] = useState({});
  // for storing project
  const [projectData, setProjectData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // doing state lifting
  const[tasksData,setTasksData]=useState([]);
  
  useEffect(() => {


       const getProject = async () => {
  
      try {
        const response=await getProjects();
        const data = response?.data;
        setProjectData(data); 

      }
      catch (error) {
        console.error("API error:", error.response?.data || error.message);
      }

    }
    getProject();
  }, [])


  return (
    <GlobalContext.Provider
      value={{
        user,setProjectData, projectData,taskObject, setTaskObject,tasksData,setTasksData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier usage
export const useGlobalContext = () => useContext(GlobalContext);
