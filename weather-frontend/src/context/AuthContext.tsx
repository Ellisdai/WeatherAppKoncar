import { createContext, useState } from "react";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [Token, setToken] = useState<string>(localStorage.getItem("token") || "");

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ Token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

