import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
import { useState } from "react";
const Layout = ({ children }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <>
            <div className="w-full">
                <Navbar toggleSidebar={toggleSidebar} />
                
                <div className="flex mx-auto">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <main className="mx-auto  w-[100%]">
                       
                        {children}
                       
                    </main>
                </div>
            </div>


        </>
    )
}
export default Layout;