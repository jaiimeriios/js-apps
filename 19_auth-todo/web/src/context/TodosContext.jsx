import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

const TodoContext = createContext();

// HOOK
export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw Error(
            'useTodoContext must be used inside an TodoContextProvider'
        );
    }
    return context;
};

// CONTEXTPROVIDER
export const TodoContextProvider = ({ children }) => {
    const { user, URL } = useAuthContext();

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${URL}/todos`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setTodos(data.reverse());
                    setLoading(false);
                } else {
                    console.error('Error fetching todos');
                    // Handle error (e.g., redirect to login)
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
                // Handle error (e.g., redirect to login)
                navigate('/login');
            }
        };
        if (user) {
            fetchTodos();
        }
    }, [user]);

    const addTodo = async (todo) => {
        try {
            const response = await fetch(`${URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ todo }),
                credentials: 'include',
            });

            if (response.ok) {
                const response = await fetch(`${URL}/todos`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setTodos(data.reverse());
                setLoading(false);
            } else {
                console.error('Error adding todo');
                // Handle error (e.g., display an error message)
            }
        } catch (error) {
            console.error(error);
            // Handle error (e.g., display an error message)
        }
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
                loading,
                error,
                addTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
