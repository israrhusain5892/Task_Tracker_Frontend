import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import CircleBar from '../components/CircleBar';
import { useGlobalContext } from '../Context/GlobalContext';
import { getAllTasks } from '../Api';

function TaskDashboard() {

   const{user}=useGlobalContext()
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed:0
  });
 
  const token = user.token;
  useEffect(() => {
        getAllTasks()
      .then((res) => {
        const allTasks = res.data;
        console.log(allTasks)
        setTasks(allTasks);
        setCounts({
          total: allTasks.length,
          pending: allTasks.filter(t => t.status === 'pending').length,
          inProgress: allTasks.filter(t => t.status === 'in progress').length,
          completed: allTasks.filter(t => t.status === 'completed').length,
        });
      });
  }, []);

  const chartData = [
    { name: 'Pending', count: counts.pending },
    { name: 'In Progress', count: counts.inProgress },
    { name: 'Completed', count: counts.completed }
  ];

  const COLORS = ['#FBBF24', '#3B82F6', '#10B981']; // yellow, blue, green

  return (
    <Layout>
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <h1 className='text-2xl font-semibold text-gray-600'>OverView</h1>
      <h1 className='text-xl text-blue-900'>Hi {user?.name} !!</h1>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card  className="text-center border" label="Total Tasks" value={counts.total} color="darkgray" />
        <Card label="Pending" value={counts.pending} color="yellow" />
        <Card label="In Progress" value={counts.inProgress} color="blue" />
        <Card label="Completed" value={counts.completed} color="green" />
      </div>
    
    <div className="flex gap-4 flex-wrap md:flex-nowrap">

         {/* Bar Chart */}
      <div className="bg-white md:w-1/2 w-full p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
        <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
        </div>
        
      </div>
      
          <div className='md:w-1/2 p-4 w-full shadow-md bg-white flex flex-col rounded-xl '>
              <p className='text-xl font-semibold px-4 py-2'>Active project progress</p>
              <div className=' h-auto my-auto mx-auto'>
                <CircleBar completed={counts.completed} total={counts.total}/>
              </div>

          </div>
          

    </div>
    <h1 className='text-xl font-semibold recent-activity'>Recent Activity</h1>

      <section className='bg-white overflow-x-auto min-w-full'>
           <table className='w-full py-4 '>
            <tr className='border-b  border-gray-300 w-full text-center py-4'>
                <th>
                      sr no.
                </th>
                <th>
                     ID
                </th>
                <th>
                     task Todo
                </th>
                <th>
                        Task Status
                </th>
            </tr>
            <tr className='w-full text-center py-4'>
                 <td>1</td>
                 <td>1</td>
                 <td>To Do signup page</td>
                 <td>Completed</td>
            </tr>

            <tr className='w-full text-center'>
                 <td>2</td>
                 <td>2</td>
                 <td>To Do signup page</td>
                 <td>Completed</td>
            </tr>

            <tr className='w-full text-center'>
                 <td>3</td>
                 <td>3</td>
                 <td>To Do signup page</td>
                 <td>Completed</td>
            </tr>

            <tr className='w-full text-center'>
                 <td>4</td>
                 <td>4</td>
                 <td>To Do signup page</td>
                 <td>Completed</td>
            </tr>
                
           </table>
      </section>
     
    </div>
    </Layout>
  );
}

function Card({ label, value, color }) {
  const colorMap = {
    gray: 'bg-gray-200 text-gray-800',
    yellow: 'bg-yellow-200 text-yellow-800',
    blue: 'bg-blue-200 text-blue-800',
    green: 'bg-green-200 text-green-800',
    darkgray:'bg-gray-600 text-white'
  };

  return (
    <div className={`p-4 rounded-xl min-h-40 flex justify-center items-center  shadow ${colorMap[color]} text-center`}>
      <div>
          <div className="text-sm ">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      </div>
     
    </div>
  );
}

export default TaskDashboard;
