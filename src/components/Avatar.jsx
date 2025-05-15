import { useState, useRef, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useGlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
const Avatar = ({ name, image,user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
    const navigate=useNavigate()
   const onLogout=()=>{
       if(user){
          localStorage.removeItem("user");
          navigate("/login")
       }
   }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 cursor-pointer rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm overflow-hidden"
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-40 bg-white shadow-lg rounded-md  z-50">
            
            <h4 className="text-lg text-gray-600 py-2 px-2 border-b border-gray-400 mb-1">{name}</h4>
             <h4 className="text-lg text-gray-600 py-1 pb-2 px-2 border-b border-gray-400 mb-3">{user?.email}</h4>
          <button
            onClick={onLogout}
            className="block cursor-pointer flex gap-1 align-items-center rounded w-full border-none text-white text-left px-4 py-2 bg-blue-600 text-sm text-gray-700 hover:bg-gray-800"
          >
            <IoLogOutOutline className="h-5 w-4 font-bold text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
