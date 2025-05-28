import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../Styling/Layout';
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
  guardian_contact: number;
  emergency_contact_name: string;
  emergency_contact_number: number;
  date_of_admission: Date;
  student_id: {
    aadhar: number;
    pancard: string;
  };
  secondaryschool: {
    school_name: string;
    total: number;
    percentage: number;
    board_name: string;
    pass_year: number;
  };
  highschool: {
    college_name: string;
    total: number;
    percentage: number;
    board_name: string;
    pass_year: number;
  };
  scholarship: {
    received: string;
    scholarship_name: string;
  };
};

export const StudentDetailsAllTable = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [hoveredDetail, setHoveredDetail] = useState<{ studentId: string | null; section: string | null }>({
    studentId: null,
    section: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authentication token is missing.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/student/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching student data:', err);
        if (err.response) {
          setError(
            `Failed to fetch student data. Status: ${err.response.status}, Message: ${
              err.response.data.message || 'Unknown error'
            }`
          );
        } else if (err.request) {
          setError('Failed to fetch student data. No response received from server.');
        } else {
          setError('Failed to fetch student data. An unexpected error occurred.');
        }
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <p className="text-lg text-blue-700">Loading...</p>;
  if (error) return <p className="text-lg text-red-700">{error}</p>;

  return (
    <Layout>
      <div>
        <h1 className="text-xl text-center text-stone-800 font-bold m-2 underline pt-3 mb-3">Student Data</h1>

        <div className={`${styles.tableContainer}`}>
          <table className="border border-2 border-lime-600">
            <thead>
              <tr className="bg-zinc-300">
                <th className="border px-1 py-1">Name</th>
                <th className="border px-1 py-1">Date of Birth</th>
                <th className="border px-1 py-1">Gender</th>
                <th className="border px-1 py-1">Email</th>
                <th className="border px-1 py-1">Phone Number</th>
                <th className="border px-1 py-1">Home Address</th>
                <th className="border px-1 py-1">ID Details</th>
                <th className="border px-1 py-1">Secondary School</th>
                <th className="border px-1 py-1">High School</th>
                <th className="border px-1 py-1">Scholarship</th>
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

                  {['id-details', 'secondary-school', 'high-school', 'scholarship'].map((section) => (
                    <td key={section} className="border px-1 relative">
                      <button
                        className="border border-1 p-1 rounded-lg bg-stone-600 text-white"
                        onMouseEnter={() => setHoveredDetail({ studentId: student._id, section })}
                        onMouseLeave={() => setHoveredDetail({ studentId: null, section: null })}
                      >
                        Open
                      </button>

                      {hoveredDetail.studentId === student._id && hoveredDetail.section === section && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg z-50 opacity-100 w-64">
                          {section === 'id-details' && (
                            <>
                              <p><strong>Aadhar:</strong> {student.student_id?.aadhar}</p>
                              <p><strong>PAN:</strong> {student.student_id?.pancard}</p>
                            </>
                          )}
                          {section === 'secondary-school' && (
                            <>
                              <p><strong>School:</strong> {student.secondaryschool?.school_name}</p>
                              <p><strong>Total:</strong> {student.secondaryschool?.total}</p>
                              <p><strong>Percentage:</strong> {student.secondaryschool?.percentage}%</p>
                              <p><strong>Board:</strong> {student.secondaryschool?.board_name.toUpperCase()}</p>
                            </>
                          )}
                          {section === 'high-school' && (
                            <>
                              <p><strong>College:</strong> {student.highschool?.college_name}</p>
                              <p><strong>Total:</strong> {student.highschool?.total}</p>
                              <p><strong>Percentage:</strong> {student.highschool?.percentage}%</p>
                              <p><strong>Board:</strong> {student.highschool?.board_name.toUpperCase()}</p>
                            </>
                          )}
                          {section === 'scholarship' && (
                            <>
                              <p><strong>Scholarship:</strong> {student.scholarship?.received === "yes-scholarship-received" ? "Yes" : "No"}</p>
                              {student.scholarship?.received === "yes-scholarship-received" && (
                                <p><strong>Name:</strong> {student.scholarship?.scholarship_name}</p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center mt-4">
            <button className="px-3 py-3 text-center font-medium text-white bg-lime-700 border border-white-100 rounded-2xl pointer" onClick={() => navigate('/landing')}>
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
