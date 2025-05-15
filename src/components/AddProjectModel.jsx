import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import { toast, ToastContainer } from 'react-toastify';
import { addProject, updateProject } from '../Api';
const AddProjectModel = ({ isOpen, isEdit, onClose, onSubmit, project }) => {

    const { projectData, setProjectData, user } = useGlobalContext();
    // project data form state
    const [formData, setFormData] = useState({
        title: '',
        status: '',
    });

    //  updating project detail on edit so that it pre filled form
    useEffect(() => {
        project && setFormData({
            title: project.title || '',
            status: project.status || ''
        })
    }, [project])


    const editSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProject(formData, project._id);
            if (res.status === 201 || res.status === 200) {
                setProjectData((prev) => {
                    return prev.map((project) => {
                        return project._id === res.data._id ? res.data : project
                    })
                })
                
                setTimeOut(() => {
                    onClose()
                }, 1000)
                toast.success("Project Edit successfully")
            }
        }
        catch(error) {
            console.log(error)
        }
        setFormData({ title: '', status: '' });
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    //  addd project 
    const submitProject = async (e) => {
        e.preventDefault();

        try {
            // post project to server
            const res = await addProject(formData);
            if (res.status === 201 || res.status === 200) {
                setProjectData([...projectData, res.data]);
                toast.success("Project added successfully")
                setTimeout(()=>{
                     onClose()
                },2000)
               
            }
        }
        catch (error) {
            const errorMsg = error.response?.data?.error;
            toast.error(`${errorMsg}`)
        }

        setFormData({ title: '', status: 'In Progress' });

    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-mt bg-opacity-50 flex justify-center items-center">
            <ToastContainer position="top-center"></ToastContainer>
            <div className="bg-white p-6 rounded-xl w-[80%] md:max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={isEdit ? editSubmit : submitProject} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModel;
