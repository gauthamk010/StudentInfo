import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "../Styling/AuthBefore/PageWrapper";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isHomeLoading, setIsHomeLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setIsLoginLoading(true);
        setIsHomeLoading(false)

        try {
            const loginResponse = await axios.post("http://localhost:5000/user/login", {
                email,
                password,
            });

            if (loginResponse.status === 200) {
                const { token } = loginResponse.data;
                if (token) {
                    auth?.login(token);
                    alert("Login Successful. Redirecting...");
                    navigate("/landing");
                } else {
                    setLoginError("Invalid credentials.");
                }
            } else {
                setLoginError(`Login failed with status: ${loginResponse.status}`);
            }
        } catch (error) {
            setLoginError("Login request failed. Please check your credentials.");
        } finally {
            setIsLoginLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row h-full w-full items-stretch justify-center bg-gray-200 p-4 md:p-8 gap-8">

                {/* Illustration Section */}
                <div className="hidden md:flex md:w-1/2 lg:w-2/5 flex-col justify-center items-center">
                    <img
                        src="/student-illust.svg"
                        alt="Student illustration"
                        className="h-96 lg:h-[28rem] w-auto object-contain"
                    />
                </div>

                <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center">
                    {/* Login Form */}
                    <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                            Welcome Back
                        </h2>

                        {loginError && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                                <p><strong>Error:</strong> {loginError}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button" 
                                    className="absolute right-3 top-1/2 mt-0.5 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    disabled={isLoginLoading}
                                    className="flex items-center justify-center gap-2 w-full sm:w-36 bg-lime-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                                >
                                    {isLoginLoading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                ></path>
                                            </svg>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    disabled={isHomeLoading}
                                    className="flex items-center justify-center gap-2 w-full sm:w-36 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-500 transition duration-200 disabled:opacity-50"
                                >
                                    {isHomeLoading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                ></path>
                                            </svg>
                                            Redirecting...
                                        </>
                                    ) : (
                                        "Back to Home Page"
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-4">
                            <p className="text-center text-md text-gray-600 ">
                                Don't have an account?
                                <Link to="/register" className="font-medium text-lime-600 hover:text-lime-500 ml-1"> Register</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};