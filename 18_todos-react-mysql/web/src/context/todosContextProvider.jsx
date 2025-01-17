import React, { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

// Custom hook to access the TodoContext
export const useTodosProvider = () => {
    return useContext(TodoContext);
};

// TodosProvider component to wrap the app and provide the context
export const TodosProvider = ({ children }) => {

    const URL = 'http://localhost:666/todos/'

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();
                setTodos(data.reverse());
            } catch (err) {
                setError('Error fetching todos');
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (todo, description, important) => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    todo,
                    description,
                    important,
                }),
            });
            if (!response.ok) {
                throw new Error('Error creating todo');
            }

            const updatedTodosResponse = await fetch(URL);
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const updatedTodos = await updatedTodosResponse.json();
            setTodos(updatedTodos.reverse());
        } catch (err) {
            setError('Error creating todo');
        }
    };

    const updateTodo = async (id, todo, description, important) => {
        try {
            const response = await fetch(`${URL}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    todo,
                    description,
                    important,
                }),
            });
            if (!response.ok) {
                throw new Error('Error updating todo');
            }
            const updatedTodo = await response.json();
            setTodos(
                todos.map((todo) => (todo.id === id ? updatedTodo : todo))
            );
        } catch (err) {
            setError('Error updating todo');
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${URL}${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting todo');
            }
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError('Error deleting todo');
        }
    };

    return (
        <TodoContext.Provider
            value={{ todos, loading, error, addTodo, updateTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
};
