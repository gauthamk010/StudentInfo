import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Styling/Layout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [studentCount, setStudentCount] = useState(0);

  const checkAdmin = () => {
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
  }
  const fetchStudentCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/student/count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudentCount(response.data);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };


  useEffect(() => {
    checkAdmin();
    fetchStudentCount();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 transition-all duration-300 bg-gray-100 p-4 border-1 border-zinc-200">
            
            {!isAdmin && (
              <>
                <div>
                  <h1 className="text-5xl font-bold mt-4 mb-2 text-center">Welcome, Student!</h1>
                  <p className="text-lg text-center">Check out your details using the sidebar</p>
                  <img
                    src="/student-illust.svg"
                    alt="Greetings"
                    className="w-full h-full rounded-md object-contain"
                  />
                </div>
              </>
            )}

            {isAdmin && (
              <div className="flex flex-col mt-4">
                
                <h1 className="text-5xl font-bold m-8 text-center">Welcome, Admin!</h1>
                <div className="flex flex-row gap-x-8">

                  <div className="flex flex-row gap-x-4 bg-gray-100 border border-1 border-zinc-200 shadow-xl p-6 rounded-full mx-4 my-8">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 border border-1 border-gray-200 rounded-full bg-violet-600 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <span className="flex flex-col">
                      <h2 className="text-xl font-semibold">Total Students</h2>
                      <p className="text-3xl mt-2">
                        {studentCount !== null ? studentCount : 'Loading...'}
                      </p>
                    </span>

                  </div>
                </div>

                <hr className="font-bold"/><br/>

                <div className="flex flex-row justify-around gap-8">
                    {/* All Students */}
                    <button
                        onClick={() => navigate("/student/all")}
                        className="size-36 flex flex-col items-center justify-center bg-gray-200 border-2 border-zinc-600 text-black rounded-full shadow-lg hover:bg-gray-600 hover:text-white transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-10 text-yellow-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-0.8584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                        <span className="text-lg font-semibold text-center">View All Students</span>
                    </button>

                  {/* Add Student */}
                  <button
                    onClick={() => navigate("/student/new")}
                    className="size-36 flex flex-col items-center justify-center bg-gray-200 border-2 border-zinc-600 text-black rounded-full shadow-lg hover:bg-gray-600 hover:text-white transition"
                  >
                    <svg
                      className="size-10 mb-2 text-emerald-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-lg font-semibold text-center">Add New Student</span>
                  </button>

                  {/* Update Student */}
                  <button
                    onClick={() => navigate("/student/update")}
                    className="size-36 flex flex-col items-center justify-center bg-gray-200 border-2 border-zinc-600 text-black rounded-full shadow-lg hover:bg-gray-600 hover:text-white transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-10 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                    <span className="text-lg font-semibold text-center">Update Student Details</span>
                  </button>

                  {/* Delete Student */}
                  <button
                    onClick={() => navigate("/student/delete")}
                    className="size-36 p-2 flex flex-col items-center justify-center bg-gray-200 border-2 border-zinc-600 text-black rounded-full shadow-lg hover:bg-gray-600 hover:text-white transition"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-10 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    <span className="text-lg font-semibold text-center">Delete Student Record</span>
                  </button>

                </div>
              </div>
            )}
          </div>
      </div>
    </Layout>
  );
};