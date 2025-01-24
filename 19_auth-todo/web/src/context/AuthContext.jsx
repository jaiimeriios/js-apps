import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// HOOK
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error(
            'useAuthContext must be used inside an AuthContextProvider'
        );
    }
    return context;
};

// CONTEXTPROVIDER
export const AuthContextProvider = ({ children }) => {

    const URL = 'http://localhost:666'

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                // const userData = {
                //     token: data.token,
                //     username: data.user.username,
                // };
                setUser(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, URL }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
