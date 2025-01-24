import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const TodosAdd = () => {
    const [todo, setTodo] = useState('');
    const { user, URL } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                // navigate('/todos');
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
        <>
            <h2>Add Todo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Todo</button>
            </form>
        </>
    );
};

export default TodosAdd;
