import { useLocation, Link } from "react-router-dom";
0
export const SignUpSuccess = () => {
    const location = useLocation();
    const { email, password } = location.state || {};

    return (
        <>
            {email && password ? (
                <div className="flex flex-col gap-2 items-center mt-4 px-2 py-1 border border-2 rounded-md">
                    <h2 className="text-2xl text-stone-800">Registration Successful!</h2>
                    <h3 className="text-xl text-stone-700">Login Details</h3>
                    <p className="text-stone-600"><i>Email:</i> {email}</p>
                    <p className="text-stone-600"><i>Password:</i> {password}</p>
                    <button className="bg-emerald-700 text-white p-1 m-2 border border-1 border-zinc-400 rounded-lg ">
                        <Link to="/login">Back to Login Page</Link>
                    </button>
                    
                </div>
            ) : (
                <div className="m-4 p-2 border border-2 rounded-lg">
                    <h2 className="text-center text-stone-800">Invalid access.</h2>
                </div>
                
            )}
        </>
    );
};
