import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

export const LandingPage = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.roles && decoded.roles.includes("admin")) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }, []);

    return (
        <Layout>

            <div className="flex">
                <div className="flex-1 transition-all duration-300 bg-gray-100 p-4"> 
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src="/student-illust.svg"
                            alt="Greetings"
                            className="w-full h-full rounded-md"   
                               
                        />

                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {isAdmin && (
                                <>
                                <button
                                    onClick={() => navigate('/student/new')}
                                    className="w-48 bg-emerald-400 text-white p-2 rounded-xl font-semibold hover:bg-emerald-500 transition"
                                >
                                    Add a New Student
                                </button>

                                <button
                                    onClick={() => navigate('/student/all')}
                                    className="w-48 bg-emerald-400 text-white p-2 rounded-xl font-semibold hover:bg-emerald-500 transition"
                                >
                                    All Students
                                </button>

                                <button
                                    onClick={() => navigate('/student/update')}
                                    className="w-48 bg-emerald-400 text-white p-2 rounded-xl font-semibold hover:bg-emerald-500 transition"
                                >
                                    Update Student Details
                                </button>

                                <button
                                    onClick={() => navigate('/student/delete')}
                                    className="w-48 bg-emerald-400 text-white p-2 rounded-xl font-semibold hover:bg-emerald-500 transition"
                                >
                                    Delete a Student
                                </button>
                                </>
                            )}
                            </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};