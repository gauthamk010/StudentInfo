import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../Layout';
import styles from './Tabulation.module.css';
import { useNavigate } from 'react-router-dom';

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
  guardian_phone: number;
  emergency_contact_name: string;
  emergency_contact_phone: number;
  date_of_admission: Date;
  student_id: { aadhar: number; pancard: string };
  secondaryschool: { school_name: string; total: number; percentage: number; board_name: string; pass_year: number };
  highschool: { college_name: string; total: number; percentage: number; board_name: string; pass_year: number };
  scholarship: { received: string; scholarship_name: string };
};

export const StudentUpdate = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }
      const response = await axios.get(`http://localhost:5000/student/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching student data:", err);
      setError("Failed to fetch student data.");
      setLoading(false);
    }
  };

  if (loading) return <p className="text-lg text-blue-700">Loading...</p>;
  if (error) return <p className="text-lg text-red-700">{error}</p>;

  return (
    <Layout>
      <div>
        <h1 className="text-xl text-center text-stone-800 font-bold m-2 underline pt-3 mb-3">Student Data</h1>

        <div className={`${styles.tableContainer}`}>
          <table className="table-auto w-full border border-2 border-lime-600">
            <thead>
              <tr className="bg-zinc-300">
                <th className="border px-1 py-1">Name</th>
                <th className="border px-1 py-1">Date of Birth</th>
                <th className="border px-1 py-1">Gender</th>
                <th className="border px-1 py-1">Email</th>
                <th className="border px-1 py-1">Phone Number</th>
                <th className="border px-1 py-1">Home Address</th>
                <th className="border px-1 py-1">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((student) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="border px-1">{student.firstname} {student.lastname}</td>
                  <td className="border px-1">{new Date(student.date_of_birth).toLocaleDateString()}</td>
                  <td className="border px-1">{student.gender}</td>
                  <td className="border px-1">{student.email}</td>
                  <td className="border px-1">{student.phone_number}</td>
                  <td className="border px-1">{student.address}, {student.city}, {student.state}, {student.pincode}</td>
                  <td className="border px-1">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700" 
                      onClick={() => navigate(`/student/update/${student._id}`)} 
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center mt-4">
            <button className="px-3 py-3 text-center font-medium text-white bg-lime-700 border border-white-100 rounded-2xl pointer" onClick={() => navigate('/landing')}>Back to Home Page</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};