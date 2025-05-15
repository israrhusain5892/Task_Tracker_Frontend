import { Outlet,useNavigate } from "react-router-dom";
import { useGlobalContext } from '../Context/GlobalContext';
const ProtectRoute=()=>{
    const navigate=useNavigate();
    const{user}= useGlobalContext();
   return (user?<Outlet/>:navigate("/login"))
}
export default ProtectRoute;