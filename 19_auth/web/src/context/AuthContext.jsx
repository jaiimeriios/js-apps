import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider component to manage state
export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    useEffect(() => {
        // Check if there's a saved JWT token in localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            setAuthState({
                isAuthenticated: true,
                user: JSON.parse(user),
                token,
            });
        }
    }, []);

    // Save token to localStorage and update the state
    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(user))
        setAuthState({ isAuthenticated: true, user, token });
    };

    // Logout user (clear token and user)
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token', token)
        sessionStorage.removeItem('user', JSON.stringify(user))
        setAuthState({ isAuthenticated: false, user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);
