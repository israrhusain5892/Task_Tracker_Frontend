
import './App.css'
import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskDashboard from './pages/TaskDashboard';
import { GlobalProvider } from './Context/GlobalContext';
import ProjectPage from './pages/ProjectPage';
import ProtectRoute from './components/ProtectRoute';


const App = () => {


  return (
    <GlobalProvider>

      <div>
        {/* <Layout /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* private routes */}
            <Route element={<ProtectRoute />}>
              <Route path="/tasks/:status" element={<TaskPage />} />
              <Route path="/taskDashboard" element={<TaskDashboard />} />
              <Route path="/projects" element={<ProjectPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </GlobalProvider>

  );
};

export default App;
