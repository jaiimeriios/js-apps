import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const Todos = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    console.log(user.user);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:666/todos', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
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
    }, [user, navigate]);

    return (
        <div className="container">
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
