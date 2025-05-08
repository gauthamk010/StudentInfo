import { Login } from "./Login"

export const Home = () => {
    return (
    <div className="">

       <div className="header flex items-center justify-between bg-zinc-600 h-1/4 mx-5 mt-3 mb-3 border border-white border-1 rounded-md p-5">
    
            <img src="/wreath-icon-logo.svg" alt="Logo" className="h-16 w-24 rounded-lg" />
            <h1 className="text-4xl text-center text-bold italic flex-grow text-stone-100">
                LearnUp Institute
            </h1>
            <img src="/wreath-icon-logo.svg" alt="Logo" className="h-16 w-24 rounded-lg" />
        
        </div>

        <div className="login">
            <Login />
        </div>

    </div>
    )
}