import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "./Styling/AuthBefore/PageWrapper";

export const Home = () => {
  const navigate = useNavigate();
  const images = ["/slideshow1.jpg", "/slideshow2.jpg", "/slideshow3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <PageWrapper>
        <div className="flex flex-col md:flex-row h-full gap-6 justify-center items-center bg-gray-100 rounded-xl shadow-xl p-4">

            {/* Left: Navigation */}
            <div className="relative z-10 w-full md:w-1/2 flex-shrink-0 flex flex-col flex-2 items-center justify-center bg-white bg-opacity-90 p-6 rounded-xl shadow-md max-w-md mx-auto md:mx-0">
            <nav className="flex flex-col gap-10 text-center w-full">
                {/* Login Section */}
                <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome Back!</h2>
                <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-lime-500 text-white text-lg font-medium py-2 rounded-lg shadow hover:bg-lime-400 transition-colors duration-300"
                >
                    Login
                </button>
                </div>

                {/* Signup Section */}
                <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">New here?</h2>
                <button
                    onClick={() => navigate("/register")}
                    className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                >
                    Register
                </button>
                </div>
            </nav>
            </div>

            {/* Right: Slideshow */}
            <div className="w-full relative flex-grow flex-3 min-h-0 h-full rounded-xl overflow-hidden shadow-lg border border-red-400">
            {images.map((image, index) => (
                <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`absolute top-0 left-0 size-full object-cover rounded-xl transition-all duration-1000 ease-in-out
                    ${index === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}
                `}
                />
            ))}
            </div>
        </div>
    </PageWrapper>
  );
};
