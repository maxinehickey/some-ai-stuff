import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => 
        sessionStorage.getItem("isLoggedIn") === "true"
    );

    const login = () => {
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
