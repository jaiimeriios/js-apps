import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';
import Logout from './Logout';
import TodosAdd from './TodosAdd';

const Todos = () => {
    const { user, URL } = useAuthContext();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

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
            <h3>{user.user.username}</h3>
            <Logout />

            
            <TodosAdd />
            <ul>
                {todos.map((todo, i) => (
                    <li key={`todo-${i}`}>{todo.todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
