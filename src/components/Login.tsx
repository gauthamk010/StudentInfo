import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError("")
        const loginResponse = await axios.post('http://localhost:5000/user/login', {email, password})
        try
        {
            if(loginResponse.status === 200 ){
                const { token } = loginResponse.data;
                if (token) {
                    auth?.login(token);
                    alert("Login Successful. Redirecting you now...") 
                    navigate("/landing");
                } else {
                    alert('Invalid credentials');
                    navigate('/login')
                }
            }
            else{
                setLoginError(`Login failed: Status code ${loginResponse.status}`); 
            }
        }
        catch (error) 
        {
             console.log(error)  
        }
    }

  return (
    <div className="flex items-center h-3/4 max-w-3/5 bg-gray-100">

        <div className="flex flex-row justify-center gap-x-8 items-center w-full px-4 py-8 bg-gray-100">
            
            {/* Illustration */}
            <img src="/student-illust.svg" alt="Illustration" className="h-72 w-96 border border-black border-1 rounded-md" />

            {/* Login Form Container */}
            <div className="bg-white p-8 rounded-lg shadow-lg h-96 w-80">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                    Login
                </h2>

                {loginError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline">{loginError}</span>
                    </div>
                )}

                <form method="POST" onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                        <input type="email" id="email" placeholder="Enter your email"
                            className="w-full m-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            required
                            value={email}
                            onChange ={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input type="password" id="password" placeholder="Enter your password"
                            className="w-full p-2 m-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            required
                            value={password}
                            onChange ={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <button
                            type="submit"
                            className="w-24 bg-emerald-700 text-white mt-4 p-2 rounded-xl font-semibold hover:bg-emerald-500 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>

            </div>

            {/* Illustration */}
            <img src="/student-illust.svg" alt="Illustration" className="h-72 w-96 border border-black border-1 rounded-md" />

        </div>
    </div>
    
  );
};
