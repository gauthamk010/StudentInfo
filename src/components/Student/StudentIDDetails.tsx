import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../Styling/Layout';
import styles from './Tabulation.module.css';

type Student = {
  _id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone_number: number;
  date_of_birth: Date;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
  guardian_name: string;
  guardian_contact: number;
  emergency_contact_name: string;
  emergency_contact_number: number;
  date_of_admission: Date;
  student_id: { aadhar: number; pancard: string };
  secondaryschool: { school_name: string; total: number; percentage: number; board_name: string; pass_year: number };
  highschool: { college_name: string; total: number; percentage: number; board_name: string; pass_year: number };
  scholarship: { received: string; scholarship_name: string };
};

export const StudentIDDetailsTable = () => {
  const [studentData, setStudentData] = useState<Student | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token'); 
  
        if (!token) {
          setError("Authentication token is missing from cookie. Please log in.");
          setLoading(false);
          return;
        }
  
        let apiUrl: string = `http://localhost:5000/student/me`;
  
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        setStudentData(response.data);
        setLoading(false);
  
      } catch (err: any) {
        console.error("Error:", err);
        setError("Failed to fetch student data.");
        setLoading(false);
      }
    };
  
    fetchStudentData();
  }, []);
  

  if (loading) return <p className="text-lg text-blue-700">Loading...</p>;
  if (error) return <p className="text-lg text-red-700">{error}</p>;

  if (!studentData) return <p>No details found.</p>;


  return(
    <Layout>
            <h1 className="text-xl text-center text-stone-800 font-bold m-2 underline pt-3 mb-3">Student Data</h1>
            <h2 className="text-lg text-center text-stone-800 font-bolder m-2 underline pt-3 mb-3">Identification Details</h2>
            
            <div className={`${styles.tableContainer}`}>
              <table className="w-full max-w-full border border-2 border-lime-600 table-auto">
              
                <thead>
                <tr className='bg-zinc-300'>
                    <th className="border px-4 py-2">Phone Number</th>
                    <th className="border px-4 py-2">Email ID</th>
                    <th className="border px-4 py-2">Aadhar Card</th>
                    <th className="border px-4 py-2">PAN Card</th>
                </tr>
                </thead>

                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{studentData.phone_number}</td>
                        <td className="border px-4 py-2">{studentData.email}</td>
                        <td className='border px-4 py-2'>{studentData.student_id?.aadhar}</td>
                        <td className='border px-4 py-2'>{studentData.student_id?.pancard}</td>
                    </tr>
                </tbody>

              </table>
            </div>
    
    </Layout>
  )
}