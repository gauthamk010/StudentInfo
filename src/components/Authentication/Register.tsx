import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Assuming AuthContext is in the same directory
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "../Styling/AuthBefore/PageWrapper";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError("");
        setIsLoading(true);

        try {
            const registerResponse = await axios.post("http://localhost:5000/user/register", {
                name,
                email,
                password,
            });

            // It's good practice to check for successful status codes like 201 (Created) for registration
            if (registerResponse.status === 201 || registerResponse.status === 200) {
                const { token } = registerResponse.data; // Assuming token is sent on successful registration for auto-login
                if (token && auth) {
                    auth.login(token);
                    alert("Registration Successful! Redirecting...");
                    navigate("/landing"); // Or to a profile setup page, dashboard, etc.
                } else {
                    // Handle cases where registration is successful but no token (e.g., email verification needed)
                    alert("Registration Successful! Please check your email to verify or proceed to login.");
                    navigate("/login");
                }
            } else {
                // This path might not be hit if server returns error HTTP codes which go to catch block
                setRegisterError(`Registration failed with status: ${registerResponse.status}`);
            }
        } catch (error: any) { // Catch block for network errors or server error responses (4xx, 5xx)
            if (axios.isAxiosError(error) && error.response) {
                // Server responded with an error status code (e.g., 400, 409, 500)
                setRegisterError(error.response.data.message || "Registration failed. Please check your details and try again.");
            } else {
                // Network error or other unexpected error
                setRegisterError("Registration request failed. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row h-full w-full items-stretch justify-center bg-gray-200 p-4 md:p-8 gap-8">

                {/* Illustration Section */}
                <div className="hidden md:flex md:w-1/2 lg:w-2/5 flex-col justify-center items-center">
                    <img
                        src="/student-illust.svg" // Make sure this path is correct (from public folder)
                        alt="Student illustration"
                        className="h-96 lg:h-[28rem] w-auto object-contain"
                    />
                </div>

                {/* Register Form Section (Parent of the card) */}
                {/* This div takes up its allocated space and centers the card. */}
                <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center">
                    {/* Register Form Card */}
                    {/*
                      MODIFIED:
                      - `max-h-full`: Allows the card to take up to the full height of its parent
                                      (the "Register Form Section" div).
                      - `overflow-y-auto`: Adds a vertical scrollbar if the content inside this card
                                           exceeds its calculated `max-h-full`.
                    */}
                    <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8 max-h-full overflow-y-auto">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                            Create Your Account
                        </h2>

                        {registerError && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                                <p><strong>Error:</strong> {registerError}</p>
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-5">
                               <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text" // Corrected: input type for name is "text"
                                    id="name"
                                    placeholder="Full Name"
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

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

                            {/* Button container */}
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-lime-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <> One Moment ... </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    disabled={isLoading}
                                    className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-200 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                       <> Redirecting... </>
                                    ) : (
                                        "Back to Home"
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-md text-gray-600">
                                Already have an account?
                                <Link to="/login" className="font-medium text-lime-600 hover:text-lime-500 ml-1">
                                    Login here
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};