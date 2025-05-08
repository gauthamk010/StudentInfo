import React from 'react';
import { useNavigate } from "react-router-dom";

interface SidebarProps 
{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSubmenu: string | null; 
  toggleContactSubmenu: () => void;
  toggleEducationSubmenu: () => void;
  isContactSubmenuOpen: boolean;  
  isEducationSubmenuOpen: boolean;
}

export const Sidebar = 
(
    { 
    isSidebarOpen, setIsSidebarOpen, toggleContactSubmenu, 
    toggleEducationSubmenu, isContactSubmenuOpen, 
    isEducationSubmenuOpen}: SidebarProps) => {
        
        const navigate = useNavigate();

        const handleNavigation = (path: string) => {
            if (isSidebarOpen) {
                navigate(path);
            }
        };

        return (
            <div className="flex flex-col rounded-lg h-full">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    className={`absolute top-5 bg-gray-900 text-white p-1 rounded-xl hover:bg-gray-600 transition duration-300
                    ${isSidebarOpen ? "left-[120px]" : "translate-x-[5px]"}`} >
                    <svg
                        aria-hidden="true"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 
                                        1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
    
                {/* Sidebar Content */}
                <div className="mt-12 space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md transition hover:bg-gray-400 cursor-pointer"
                        onClick={() => handleNavigation('/landing')}>
                        <svg className="w-5 h-5" aria-hidden="true" fill="none"
                            strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 
                                    12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 
                                    1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 
                                    1.125-1.125V9.75M8.25 21h8.25"
                                strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                        {isSidebarOpen && <span className="text-sm">Home</span>}
                    </div>
    
                    <div className="flex items-center gap-2 p-2 rounded-md transition hover:bg-gray-400 cursor-pointer"
                        onClick={() => handleNavigation('/student/me')}>
                        <svg className="w-5 h-5" data-slot="icon" aria-hidden="true" fill="none"
                            strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 
                            2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 
                            0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        {isSidebarOpen && <span className="text-sm">Personal Info</span>}
                    </div>
    
                    <div
                        className="flex flex-col rounded-md transition cursor-pointer"
                        onClick={isSidebarOpen ? toggleContactSubmenu : undefined}
                    >
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-400">
                            <svg className="w-4 h-4" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <div className='flex items-center justify-between'>
                                {isSidebarOpen && <span className="text-sm">Contact Info</span>}
                                {/* Dropdown Arrow */}
                                {isSidebarOpen && (
                                            <svg className={`w-4 h-4 ml-7 transition-transform 
                                                ${
                                                isContactSubmenuOpen ? "rotate-90" : ""
                                                }`} 
                                                data-slot="icon" 
                                                aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round">
                                                </path>
                                            </svg>
                                )}
                            </div>
                        </div>
    
                        {/* Submenu Items */}
                        <ul className={`transition-all duration-300 overflow-hidden ${isContactSubmenuOpen ? "max-h-60" : "max-h-0"} pl-4`}>
                             
                            <li className="flex items-center gap-2 px-2 text-sm py-1 my-2 hover:bg-gray-400 rounded cursor-pointer"
                                onClick={() => navigate('/student/me/id-details')}>
                                    ID Details
                                </li>
    
                                  
                                <li className="flex items-center gap-2 px-2 text-sm py-1 my-2 hover:bg-gray-400 rounded cursor-pointer"
                                    onClick={() => navigate('/student/me/external-contact')}>
                                    Contact Details
                                </li>
    
                            </ul>
                        </div>
    
                        <div
                            className="flex flex-col rounded-md transition cursor-pointer"
                            onClick={isSidebarOpen ? toggleEducationSubmenu : undefined}>
                            {/* Main Menu Item */}
                            <div className="flex items-center p-2 hover:bg-gray-400">
                                <div className="flex items-center gap-2">
                                    {/* Main Icon */}
                                    <svg className="w-5 h-5" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0
                                        0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className='flex items-center justify-between'>
                                        {isSidebarOpen && <span className="text-sm">Education History</span>}
                                        {/* Dropdown Arrow */}
                                        {isSidebarOpen && (
                                        <svg className={`w-4 h-4 transition-transform 
                                            ${
                                            isEducationSubmenuOpen ? "rotate-90" : ""
                                            }`} 
                                            data-slot="icon" 
                                            aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                        </svg>
                                    )}
                                    </div>
                                </div>
                            </div>
    
                            {/* Collapsible Submenu */}
                            <ul className={`transition-all duration-300 overflow-hidden ${isEducationSubmenuOpen ? "max-h-40" : "max-h-0"} pl-4`}>
                                {/* Secondary School */}
                                <li className="flex items-center gap-2 px-2 text-sm py-1 my-2 hover:bg-gray-400 rounded cursor-pointer"
                                    onClick={() => navigate('/student/me/secondary-school')}>
                                    Secondary School
                                </li>
    
                                {/* High School */}
                                <li className="flex items-center gap-2 px-2 text-sm py-1 my-2 hover:bg-gray-400 rounded cursor-pointer"
                                    onClick={() => navigate('/student/me/high-school')}>
                                    High School
                                </li>
    
                                {/*  Scholarship menu Item */}
                                <li className="flex items-center gap-2 px-2 text-sm py-1 my-2 hover:bg-gray-400 rounded cursor-pointer" 
                                    onClick={() => navigate('/student/me/scholarship')}>
                                    Scholarship
                                </li>

                            </ul>
                        </div>
    
                </div>

            </div>
    )
} 