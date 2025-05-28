import { AboutFooter } from "./AboutFooter";
import { TitleHeader } from "./TitleHeader";

type Props = {
  children: React.ReactNode;
};

export const PageWrapper = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-scroll">
        <TitleHeader />
        <main className="flex-1 w-full max-w-5xl mx-auto flex justify-center items-center">
            <div className="w-full h-[60vh]">
                {children}
            </div>
        </main>
        <AboutFooter />
    </div>
  );
};