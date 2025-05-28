//import { useEffect } from 'react'
//import { useAuth } from '../Authentication/AuthContext';
//import Cookies from 'js-cookie';
import axios from "axios";
import { useForm, FieldErrors } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Layout } from "../Styling/Layout";

type StudentForm = {
  firstname: string,
  middlename: string,
  lastname: string,
  email: string,
  phone_number: number,
  date_of_birth: Date,
  gender: string,
  address: string,
  city: string,
  state: string,
  pincode: number,
  guardian_name: string,
  guardian_contact: number,
  emergency_contact_name: string,
  emergency_contact_number: number,
  date_of_admission: Date,
  student_id: {
    aadhar: number,
    pancard: string,
  },
  secondaryschool: {
    school_name: string,
    total: number,
    percentage: number,
    board_name: string,
    pass_year: number,
  },
  highschool: {
    college_name: string,
    total: number,
    percentage: number,
    board_name: string,
    pass_year: number,
  }
  scholarship: {
    received: string,
    scholarship_name: string,
  }
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i);

export const StudentRegistrationForm = () => {
    //const auth = useAuth();
    const navigate = useNavigate();
  
    const form = useForm <StudentForm>({
    defaultValues: {
      firstname: "",
      middlename:"",
      lastname: "",
      email: "",
      phone_number: undefined,
      date_of_birth: new Date(),
      gender: "Select",
      address: "",
      city: "",
      state:'',
      pincode: undefined,
      guardian_name: "",
      guardian_contact: undefined,
      emergency_contact_name: "",
      emergency_contact_number: undefined,
      date_of_admission: new Date(),
      student_id: {
        aadhar: undefined,
        pancard: '',
      },
      secondaryschool: {
        total: undefined,
        percentage: undefined,
        board_name: "Select",
        pass_year: new Date().getFullYear(),
      },
      highschool: {
        total: undefined,
        percentage: undefined,
        board_name: "Select",
        pass_year: new Date().getFullYear(),
      },
      scholarship: {
        received: "Select",
        scholarship_name: '',
      }
    }
  })

  const onSubmit = async (data: StudentForm ) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
              return;
            }  

        const config =  {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post("http://localhost:5000/student/new", 
            JSON.stringify(data), config
        );

        if (response.status === 201) {
            alert("Details of student successfully added! Thank you!");
            navigate('/signup',{ state: { email: response.data.email, password: response.data.password } } )
        } 
        else {
            alert("Something went wrong. Please try again.");
        }
    } 
        catch (error) {
        console.error(error);
    }
}


const onError = (errors: FieldErrors<StudentForm>) => {
    console.log("Errors in student form: ", errors)
    alert(`Details failed to add. Check for errors or missing fields`)
    }   

  const { register, handleSubmit, reset, formState } = form 
  const { errors } = formState

  return (
    <Layout>

        <h1 className='text-3xl text-center text-stone-800 font-bold m-2 underline pt-3'>Registration Form</h1>
        <p className="text-md text-stone-800 text-center m-1 pt-2 italic">Please fill in all the fields correctly.</p>

        <div className='w-4/5 h-fit mx-auto mt-5 p-5 bg-zinc-100 border border-2 border-lime-600 shadow-lg rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        
                {/* BIODATA */}
                <fieldset className="w-full px-1 py-2 border border-black">
                    <legend className="text-md underline"> Biodata of student</legend>

                        <div className='flex flex-col p-4 gap-2 items-start place-content-evenly'>

                            <label htmlFor="firstname" className="text-md font-medium">First Name:</label>
                            <input id="firstname" placeholder="First Name" 
                                className="w-4/5 border p-1 rounded" 
                                {...register("firstname", { 
                                    required: "First Name is required",
                                    pattern: { value: /^[a-zA-Z ]+$/, message: 'Invalid format' }
                                })} 
                            />
                            <p className="text-red-500 text-sm">{errors.firstname?.message}</p>

                            <label htmlFor="middlename" className="text-md font-medium">Middle Name:</label>
                            <input id="middlename" placeholder="Middle Name (optional)" 
                                className="w-4/5 border p-1 rounded"
                                {...register("middlename", {
                                    pattern: { value: /^[a-zA-Z ]+$/, message: 'Invalid format' }
                                })} 
                            />
                            <p className="text-red-500 text-sm">{errors.middlename?.message}</p>

                            <label htmlFor="lastname" className="text-md font-medium">Last Name:</label>
                            <input id="lastname" placeholder="Last Name" 
                                className="w-4/5 border p-1 rounded"
                                {...register("lastname", { 
                                    required: "Last Name is required",
                                    pattern: { value: /^[a-zA-Z ]+$/, message: 'Invalid format' }
                                })} 
                            />
                            <p className="text-red-500 text-sm">{errors.lastname?.message}</p>

                        </div>

                    
                            <div className="flex flex-col gap-1 pt-1 justify-between">
                                <div className="flex flex-col gap-1 pl-3 items-start">
                                    <label className="block text-md font-medium m-2" htmlFor="dob">Date of Birth:</label>
                                    
                                    <input 
                                        className="block h-1/3 w-6/7 rounded-md border border-gray-300 p-2" 
                                        type="date" 
                                        id="dob" 
                                        {...register('date_of_birth', {
                                            valueAsDate: true,
                                            required: { value: true, message: 'Date of Birth is needed' },
                                            validate: (value) => value ? true : "Invalid Date",
                                        })} 
                                    />
                                    <p className="ml-1 text-red-500 text-sm">{errors.date_of_birth?.message}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 pt-3 pl-3 items-start">
                                <label className="inline-block text-md font-medium m-2" htmlFor="gender">Gender:</label>
                                
                                <div className="flex flex-row gap-3 pl-2 pr-1 border border-gray-300 rounded-md py-2">
                                    <label htmlFor="gender-male" className="flex items-center gap-1">
                                        <input id="gender-male" type="radio" value="Male" {...register("gender", { required: "Gender is required" })} />
                                        Male
                                    </label>
                                    <label htmlFor="gender-female" className="flex items-center gap-1">
                                    <input id="gender-female" type="radio" value="Female" {...register("gender", { required: "Gender is required" })} />
                                    Female
                                    </label>
                                </div>
                                    <p className="ml-1 text-red-500 text-sm">{errors.gender?.message}</p>
                            </div>   
                            <br/>
                </fieldset>
                
                    {/* CONTACT INFO */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Contact info</legend>
                            
                        <div className="flex flex-col gap-2 px-2 py-2">
                                
                            <div className="flex flex-col"> 
                                <label htmlFor="email" className="inline-block text-md font-medium m-2">Email ID of student: </label>
                                <input id="email" type="email" placeholder="email@email.com" className="w-4/5 border m-1 p-1 rounded" {...register("email", { required: "Email ID is required", 
                                        pattern:{
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Invalid format'
                                        }
                                    })} />
                                    <p className="ml-1 text-red-500 text-sm">{errors.email?.message}</p>
                            </div>

                            <div>
                                <label htmlFor="phone-number" className="inline-block text-md font-medium m-2">Phone Number of student: </label>
                                <input id="phone-number" type="tel" placeholder="10-digit number" className="w-4/5 border m-1 p-1 rounded" {...register("phone_number", { required: "Phone number is required",
                                        pattern:{
                                            value: /^\d+$/,
                                            message: 'Invalid format'
                                        }
                                    })} />
                                <p className="ml-1 text-red-500 text-sm">{errors.phone_number?.message}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="guardian_name" className="inline-block text-md font-medium m-2">Name of Parent/Guardian:</label>
                                <input id="guardian_name" type="text" placeholder="Full name of parent/guardian" className="w-4/5 border ml-1 p-1 rounded" {...register("guardian_name", { required: "Guardian name is required",
                                        pattern:{
                                            value:/^[a-zA-Z. ]+$/,
                                            message:'Invalid format'
                                        } 
                                    })}                            />
                                <p className="ml-1 text-red-500 text-sm">{errors.guardian_name?.message}</p>
                            </div>
                            
                            <div className="flex flex-col">
                                <label htmlFor="guardian_phone" className="inline-block text-md font-medium m-2">Guardian/Parent Phone:</label>
                                <input
                                    id="guardian_phone"
                                    type="tel"
                                    placeholder="10-digit number"
                                    className="w-4/5 border ml-1 p-1 rounded"
                                    {...register("guardian_contact", { required: "Guardian phone number is required",
                                        pattern:{
                                            value: /^\d+$/,
                                            message: 'Invalid format'
                                        }
                                    })}
                                />
                                <p className="ml-1 text-red-500 text-sm">{errors.guardian_contact?.message}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="emergency_contact_name" className="inline-block text-md font-medium m-2">Emergency Contact Name:</label>
                                <input
                                    id="emergency_contact_name"
                                    type="text"
                                    placeholder="Full name required"
                                    className="w-4/5 border ml-1 p-1 rounded"
                                    {...register("emergency_contact_name", { required: "Emergency contact name is required",
                                        pattern:{
                                            value:/^[a-zA-Z ]+$/,
                                            message:'Invalid format'
                                        } 
                                    })}
                                />
                                <p className="ml-1 text-red-500 text-sm">{errors.emergency_contact_name?.message}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="emergency_contact_phone" className="inline-block text-md font-medium m-2">Emergency Contact Phone:</label>
                                <input
                                    id="emergency_contact_phone"
                                    type="tel"
                                    placeholder="10-digit number"
                                    className="w-4/5 border ml-1 p-1 rounded"
                                    {...register("emergency_contact_number", { required: "Emergency contact phone is required",
                                        pattern:{
                                            value: /^\d+$/,
                                            message: 'Invalid format'
                                        }
                                    })}
                                />
                                <p className="ml-1 text-red-500 text-sm">{errors.emergency_contact_number?.message}</p>
                            </div>

                        </div>

                        <br/>
                    </fieldset>
        
                    {/* RESIDENTIAL DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Residential details</legend>

                            <div className="flex flex-col p-2 gap-1 justify-between place-items-stretch">
                            <label htmlFor="address" className="inline-block text-md font-medium m-2">Address: </label>
                            <input type="text" id="address" placeholder="Full Address" className="w-4/5 border ml-1 p-1 rounded" {...register('address',
                                {required: 'Address is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s,'-./#]+$/,
                                        message: 'Invalid Address'
                                    }
                                })} />
                            <p className="ml-1 text-red-500 text-sm">{errors.address?.message}</p>

                            <div className="flex flex-col">
                                <label htmlFor="city" className="inline-block text-md font-medium m-2">City: </label>
                                <input type="text" id="city" placeholder="City" className="w-4/5 border ml-1 p-1 rounded" {...register('city',
                                    {required: 'Name of city is required',
                                        pattern:{
                                            value: /^[a-zA-Z ]+$/,
                                            message: 'Invalid format'
                                        }
                                    })} />
                                <p className="ml-1 text-red-500 text-sm">{errors.city?.message}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="state" className="inline-block text-md font-medium m-2">State: </label>
                                <input type="text" id="state" placeholder="State" className="w-4/5 border ml-1 p-1 rounded" {...register('state',
                                    {required: 'Name of state is required',
                                        pattern:{
                                            value: /^[a-zA-Z ]+$/,
                                            message: 'Invalid format'
                                        }
                                    })} />
                                <p className="ml-1 text-red-500 text-sm">{errors.state?.message}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="pincode" className="inline-block text-md font-medium m-2">PINCode:</label>
                                <input type="text" id="pincode" defaultValue="" placeholder="Valid 6-digit PIN Code" className="w-4/5 border ml-1 p-1 rounded" {...register('pincode',
                                    {
                                    required: 'PIN Code is required',
                                    pattern:{ value:/^\d{6}$/, message:'Invalid PIN code'},
                                    })} />
                                <p className="ml-1 text-red-500 text-sm">{errors.pincode?.message}</p>
                            </div>
                        </div>

                        <br/>
                    </fieldset>
        
                    {/* IDENTIFICATION DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Identification details</legend>

                        <div className="flex flex-col p-3 gap-1 justify-between place-items-center">

                            <label htmlFor="aadhar" className="inline-block text-md font-medium m-2">Aadhar Card Number:</label>
                            <input type="text" id="aadhar" placeholder="12-digit UID needed" className="w-4/5 border ml-1 p-1 rounded" {...register('student_id.aadhar',
                                    {
                                    required: 'Aadhar number is required',
                                    pattern:{ value:/^\d{12}$/, message:'Invalid format'},
                                    })}/>
                            <p className="text-red-500 text-sm">{errors.student_id?.aadhar?.message}</p>

                            <label htmlFor="pancard" className="inline-block text-md font-medium m-2">PAN Card Number:</label>
                            <input type="text" id="pancard" placeholder="10-character alphanumeric UID" className="w-4/5 border ml-1 p-1 rounded" {...register('student_id.pancard',
                                    {
                                    required: 'PAN number is required',
                                    pattern: {value:/^[A-Z0-9]+$/, message:'Invalid format'},
                                    })}/>
                            <p className="text-red-500 text-sm">{errors.student_id?.pancard?.message}</p>

                        </div>
                        <br/>
                    </fieldset>
                
                    {/* ADMISSION DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Admission Details</legend>

                        <div className="flex flex-col p-1 items-center">
                            <label htmlFor="doa" className="block text-md font-medium m-2">Date of Admission:</label>
                            <input type="date" id="doa" {...register('date_of_admission', {
                                        valueAsDate: true,
                                        required: {
                                            value: true,
                                            message:'Date of Admission required'
                                        },
                                        validate: (value) => {
                                            return value ? true : "Invalid Date"
                                        },
                                    })} />
                        </div>
                            <p className="text-center text-red-500 text-sm">{errors.date_of_admission?.message}</p>    
                        <br/>
                    </fieldset>
        
                    {/* CLASS 10/ SSLC DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Secondary School Details</legend>

                        <div className="flex flex-row p-1 items-center justify-center">
                            <label htmlFor="sslc_school_name" className="block text-md font-medium mr-2">School Name: </label>
                            <input type="text" id="sslc_school_name" placeholder="School Name" className="border rounded w-4/5 mr-1" {...register('secondaryschool.school_name', {pattern:{ value:/^[a-zA-Z0-9 \s,'-.]+$/ ,message:'Proper name needed'} 
                            })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-4 py-2">

                            <div className="flex items-center gap-2">
                                <label htmlFor="sslc_board_name" className="w-1/3 text-md font-medium">Education Board:</label>
                                <select 
                                id="sslc_board_name" 
                                defaultValue="" 
                                className="w-2/3 border rounded-md p-2" 
                                {...register("secondaryschool.board_name", { required: "Education Board is required" })}
                                >
                                <option value="" disabled>Select</option>
                                <option value="sslc">SSLC</option>
                                <option value="cbse">CBSE</option>
                                <option value="icse">ICSE</option>
                                <option value="other">Other</option>
                                </select>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.secondaryschool?.board_name?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="sslc_pass_year" className="w-1/3 text-md font-medium">Year of Passing:</label>
                                <select 
                                id="sslc_pass_year" 
                                defaultValue="" 
                                className="w-2/3 border rounded-md p-2" 
                                {...register('secondaryschool.pass_year', { required: "Year selection is required" })}
                                >
                                <option value="" disabled>Select a year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                                </select>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.secondaryschool?.pass_year?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="sslc_total" className="w-1/3 text-md font-medium">Total Marks:</label>
                                
                                <div className="flex items-center w-2/3">
                                    <input 
                                        type="text" 
                                        id="sslc_total" 
                                        placeholder="000" 
                                        className="w-full border rounded-md p-2" 
                                        {...register('secondaryschool.total', {
                                        required: 'Total marks is required',
                                        pattern: {
                                            value: /^(?:[1-9][0-9]{0,1}|[1-4][0-9]{2}|500)$/,
                                            message: 'Cannot be less than 0 or exceed 500'
                                        }
                                        })}
                                    />
                                <span className="ml-1 font-bold">/500</span>
                                </div>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.secondaryschool?.total?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="sslc_percentage" className="w-1/3 text-md font-medium">Percentage:</label>
                                <div className="flex items-center w-2/3">
                                    <input 
                                        type="text" 
                                        id="sslc_percentage" 
                                        placeholder="00.00%" 
                                        className="w-full border rounded-md p-2" 
                                        {...register('secondaryschool.percentage', {
                                        required: 'Percentage is required',
                                        pattern: {
                                            value: /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/,
                                            message: 'Invalid percentage'
                                        }
                                        })}
                                    />
                                <span className="ml-1 font-bold">%</span>
                                </div>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.secondaryschool?.percentage?.message}</p>
                        </div>

                    </fieldset>
        

                    {/* CLASS 12/ PUC DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">High School Details</legend>
                        
                        <div className="flex flex-row p-3 items-center justify-center">
                            <label htmlFor="hsc_school_name" className="block text-md w-1/5 font-medium m-1">School/College Name: </label>
                            <input type="text" id="hsc_school_name" placeholder="School/College Name" className="border rounded w-4/5 mr-1" {...register('highschool.college_name', 
                            {
                                pattern: {
                                    value:/^[a-zA-Z0-9 \s,'-.]+$/ ,message:'Proper name needed',
                                }

                            })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-4 py-2">

                            <div className="flex items-center gap-2">
                                <label htmlFor="hsc_board_name" className="w-1/3 text-md font-medium">Education Board:</label>
                                <select 
                                id="hsc_board_name" 
                                defaultValue="" 
                                className="w-2/3 border rounded-md p-2" 
                                {...register("highschool.board_name", { required: "Education Board is required" })}
                                >
                                <option value="" disabled>Select</option>
                                <option value="puc">PUC</option>
                                <option value="cbse">CBSE</option>
                                <option value="icse">ISC</option>
                                <option value="other">Other</option>
                                </select>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.highschool?.board_name?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="hsc_pass_year" className="w-1/3 text-md font-medium">Year of Passing:</label>
                                <select 
                                id="hsc_pass_year" 
                                defaultValue="" 
                                className="w-2/3 border rounded-md p-2"
                                {...register('highschool.pass_year', { required: "Year selection is required" })}
                                >
                                <option value="" disabled>Select a year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                                </select>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.highschool?.pass_year?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="hsc_total" className="w-1/3 text-md font-medium">Total Marks:</label>
                                <div className="flex items-center w-2/3">
                                <input 
                                    type="text" 
                                    id="hsc_total" 
                                    placeholder="000" 
                                    className="w-full border rounded-md p-2" 
                                    {...register('highschool.total', {
                                    required: 'Total marks is required',
                                    pattern: {
                                        value: /^(?:[1-5]?\d{1,2}|600)$/,
                                        message: 'Cannot be non-zero or exceed 600'
                                    }
                                    })}
                                />
                                <span className="ml-1 font-bold">/600</span>
                                </div>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.highschool?.total?.message}</p>

                            <div className="flex items-center gap-2">
                                <label htmlFor="hsc_percentage" className="w-1/3 text-md font-medium">Percentage:</label>
                                <div className="flex items-center w-2/3">
                                <input 
                                    type="text" 
                                    id="hsc_percentage" 
                                    placeholder="00.00%" 
                                    className="w-full border rounded-md p-2" 
                                    {...register('highschool.percentage', {
                                    required: 'Percentage is required',
                                    pattern: {
                                        value: /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/,
                                        message: 'Invalid percentage'
                                    }
                                    })}
                                />
                                <span className="ml-1 font-bold">%</span>
                                </div>
                            </div>
                            <p className="p-5 text-red-500 text-sm">{errors.highschool?.percentage?.message}</p>
                        </div>
                    </fieldset>

                    {/* SCHOLARSHIP DETAILS */}
                    <fieldset className="w-full px-1 py-2 border border-black">
                        <legend className="text-md underline">Scholarship details</legend>

                        <div className="flex flex-col p-3 gap-5 justify-between place-items-center">

                            <div>
                                <label htmlFor="scholarship-received" className="inline-block text-md font-medium m-2">Have you ever received a scholarship?</label>
                                <select id="scholarship-received" className="border rounded-md" defaultValue="" {...register('scholarship.received', { required: 'Please submit entry'
                                })}>
                                    <option value="" disabled>Select</option>
                                    <option value="yes-scholarship-received">Yes</option>
                                    <option value="no-scholarship-received">No</option>
                                </select>
                            </div>

                            <div>
                                <span><i>If yes, </i></span>
                                <label htmlFor="scholarship-name" className="inline-block text-md font-medium m-2">Name of Scholarship: </label>
                                <input id="scholarship-name" placeholder="Full name of scholarship" className="min-h-2/5 border rounded-md" {...register('scholarship.scholarship_name', {
                                    pattern:{
                                        value: /^[a-zA-Z0-9\s,'-.]+$/,
                                        message: 'Invalid'
                                    }
                                })}/>
                            </div>
                            
                        </div>
                    </fieldset>

                <div className="flex flex-row gap-1 items-center place-content-evenly">
                    <button type="submit" className="px-3 py-3 text-center font-medium text-white bg-lime-700 
                    border border-white-100 rounded-2xl pointer"
                    >
                        Submit form</button>
                    <button className="px-3 py-3 text-center font-medium text-black bg-white border border-black rounded-2xl pointer" type="reset" onClick={() => reset()}>Reset form</button>
                    <button className="px-3 py-3 text-center font-medium text-white bg-lime-700 border border-white-100 rounded-2xl pointer" onClick={() => navigate('/landing')}>Back to Home Page</button>
                </div>
    
            </form>
            <br/><hr/>

        </div>
        <br/><br/>
  
    </Layout> 
  )}

