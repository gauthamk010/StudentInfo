import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { ReactNode, useEffect, useState } from "react";
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleContactSubmenu = () => {
    setActiveSubmenu((prev) => (prev === 'contact' ? null : 'contact'));
  };

  const toggleEducationSubmenu = () => {
    setActiveSubmenu((prev) => (prev === 'education' ? null : 'education'));
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setActiveSubmenu(null);
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex max-w-screen h-screen sidebar-container">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-zinc-200 text-black border-r border-white ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleContactSubmenu={toggleContactSubmenu}
          toggleEducationSubmenu={toggleEducationSubmenu}
          isContactSubmenuOpen={activeSubmenu === 'contact'} 
          isEducationSubmenuOpen={activeSubmenu === 'education'} 
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className={`flex-1 ${styles.scrollableContent}`}>
          {children}
        </div>

      </div>
    </div>
  );
};