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
                    setError('Error gettings todo');
                    // Handle error (e.g., redirect to login)
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
                // Handle error (e.g., redirect to login)
                setError(error);
                // navigate('/login');
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
                setError('Error adding todo');
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const updateTodo = async (todo_id, newTodo) => {
        try {
            const response = await fetch(`${URL}/todos/${todo_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ todo: newTodo }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Error updating todo');
            }
            const updatedTodos = todos.map((todo) =>
                todo.id === todo_id ? { ...todo, todo: newTodo } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Error deleting todo');
            }
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error(error);
            setError(error);
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
                updateTodo,
                deleteTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
