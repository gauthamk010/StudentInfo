// TitleHeader.tsx
export const TitleHeader = () => {
    return (
        <header className="w-full bg-slate-900 border-b-2 border-emerald-500 shadow-lg">
            <div className="flex flex-col items-center justify-center py-3 space-y-4">
                <img
                    src="/wreath-icon-logo.svg"
                    alt="Logo"
                    className="h-20 w-auto rounded-md shadow-md"
                />
                <h1 className="text-5xl sm:text-3xl font-extrabold italic text-white tracking-wide">
                    LearnUp
                </h1>
            </div>
            <div className="h-4 bg-gradient-to-r from-lime-500 to-teal-400" />
        </header>
    );
};
