import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './Authentication/AuthContext'

export const Navbar = () => {
    const [isPicOpen, setIsPicOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleNotificationDropdown = () => {
        setIsNotifOpen((prev) => {
            if (!prev) 
                setIsPicOpen(false);
            return !prev;
        });
    };

    const togglePicDropdown = () => {
        setIsPicOpen((prev) => {
            if (!prev) 
                setIsNotifOpen(false);
            return !prev;
        });
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsPicOpen(false);
                setIsNotifOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const { logout } = useAuth();

        const handleLogout = () => {
            logout();
            alert("Logging out...") 
            navigate("/login"); 
        };

    return (
        <div className="flex items-center justify-between w-full rounded-md bg-gray-300 p-3">

            <nav className="primary-navbar flex items-center w-full h-6 justify-between">

                {/* Search Bar */}
                <div className="flex flex-1 items-center">
                    <input className="border border-inset p-1 m-1 rounded" type="search" id="search-bar" placeholder="Search" />
                    <button className="bg-stone-800 text-white border border-inset shadow-xl p-1 rounded hover:shadow-2xl" type="submit">
                        <svg data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>

                {/* Notification Button */}
                <div className="flex items-center justify-between mr-2">

                    <button className="text-gray-700 border border-inset shadow-lg rounded-lg hover:shadow-2xl m-2 p-2"
                        onClick = {toggleNotificationDropdown}
                    >
                        <svg data-slot="icon" aria-hidden="true" fill="none"
                            strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"> 
                            <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>

                    {/* Notification Bar Dropdown */}
                    {isNotifOpen && 
                    (
                            <div ref={dropdownRef} className="absolute top-[50px] right-[80px] w-80 bg-white border border-gray-300 shadow-lg rounded-md z-50"
                            >
                                <ul className="py-1">
                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                                            <svg className="size-6" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        <span>News 1</span> 
                                    </li>

                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                                            <svg className="size-6" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        <span>News 2</span>
                                    </li>

                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                                            <svg className="size-6" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        <span>News 3</span>
                                    </li>

                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                                            <svg className="size-6" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        <span>News 4</span>
                                    </li>

                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                                            <svg className="size-6" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        <span>News 5</span>
                                    </li>
                                </ul>
                            </div>
                    )}


                    {/* Profile Pic Button */}
                    <span 
                        className="m-2 p-2 border border-inset shadow-lg rounded-lg hover:shadow-2xl hover:ring-gray-900/50 cursor-pointer" 
                        onClick={togglePicDropdown}
                    >
                        <svg data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>

                    {/* Picture Dropdown Menu */}
                        {isPicOpen && (
                            <div ref={dropdownRef} className="absolute top-[50px] right-0 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50"
                            >
                                <ul className="py-1">
                                    <li 
                                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <span>Settings</span>  
                                    </li>

                                    <li 
                                        className="px-2 py-1 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                        onClick={handleLogout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                        </svg>
                                        <span>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                </div>
            </nav>
        </div>
    );
};
