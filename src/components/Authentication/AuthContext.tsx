//authcontext.tsx
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface AuthContextProps {
  student: string;
  admin: string;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [student, setStudent] = useState<string>('');
    const [admin, setAdmin] = useState<string>('');
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    // Check Token Expiry
    useEffect(() => {
        if (token) {
            try {
                const decodedUser = JSON.parse(atob(token.split(".")[1])); 
                const exp = decodedUser.exp * 1000;

                if (Date.now() >= exp) {
                    logout();
                } else {
                    if (decodedUser.roles === "admin") {
                        setAdmin("admin");
                        setStudent("");
                    } else if (decodedUser.roles === "student") {
                        setStudent("student");
                        setAdmin("");
                    }
                }
            } catch (error) {
                console.error("Invalid token format", error);
                logout();
            }
        }
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);

        try {
            const decodedUser = JSON.parse(atob(token.split(".")[1]));

            if (decodedUser.roles === "admin") {
                setAdmin("admin");
                setStudent("");
            } else if (decodedUser.roles === "student") {
                setStudent("student");
                setAdmin("");
            }
        } catch (error) {
            console.error("Invalid token format", error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setStudent('');
        setAdmin('');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ student, admin, token, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
