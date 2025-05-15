import { useState, useEffect } from 'react';
import { GlobalProvider, useGlobalContext } from '../Context/GlobalContext';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { addTask, updateTask } from '../Api';
import SubmitLoader from './SubmitLoader';
const AddTaskModel = ({ isOpen, edit, onClose, onSubmit, handleEdit, users }) => {

  // extract taskobject ,user projectData
  const { user, projectData, API_ROOT, taskObject, setTasksData, tasksData } = useGlobalContext();
  const[isLoading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    projectId: '',
    userId: user.id,
  });
  //  update the task data so that it prefilled all fields
  useEffect(() => {
    taskObject && setFormData({
      title: taskObject.title || '',
      description: taskObject.description || '',
      status: taskObject.status || '',
      projectId: taskObject.projectId || '',
      userId: user.id,
    })
  }, [taskObject])

  const editSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await updateTask(formData,taskObject._id);
      if (response.status == 201 || response.status == 200) {
        setLoading(false);
        // update state in setTaks 
        setTasksData((prev) => {
          return prev.map(curTask => {
            return curTask._id === response.data._id ? response.data : curTask;
          })
        })
      }
      //  toast.success("Task added successfully!!")
         setTimeout(()=>{
              onClose();
         },1000)
        toast.success("Task Edit successfully",response.data.title);

    }
    catch (error) {
      setLoading(false)
      toast.error("some thing went wrong try again ")
    }
    console.log("edit data:", formData)
    // making field blank after submit
    setFormData({
      title: '',
      description: '',
      status: '',
      projectId: '',
      userId: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  //  add task to db
  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true)
    try {
      // call api funtion
      const response = await addTask(formData);
    
      if (response.status == 200 || response.status === 201) {
        setLoading(false)
        setTasksData([...tasksData, response.data]);  
         
         toast.success("Task added successfully!!")
         setTimeout(()=>{
              onClose();
         },2000)
          
      }

      setFormData({title: '', description: '',status: '',projectId: '', userId: '',});
    }
    catch (error) {
      setLoading(false)
      console.log("some this went wrong ", error);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-mt ">
      <ToastContainer position='top-center'></ToastContainer>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-4 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{edit?'Edit Task':'Add New Task'}</h2>

        <form onSubmit={edit == true ? editSubmit : handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 py-2 outline-none block w-full rounded-md border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full py-2 outline-none rounded-md border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 py-2 block w-full rounded-md border border-gray-300 outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>select</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project</label>
            <select
              name="projectId"
              required
              value={formData.projectId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a project</option>
              {projectData?.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            > 
            {
              isLoading?<SubmitLoader/>:edit?"Edit Task":"Add Task"
            }
             
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModel;
