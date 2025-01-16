import { useEffect, useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:666/todos/');
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();
                console.log(data);
                setTodos(data);
            } catch (err) {
                setError('Error fetching todos');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    return (
        <>
            <h1>Todos</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className='todos-container'>
                {todos.length === 0 ? (
                    <p>No todos available</p>
                ) : (
                    todos.map((todo) => (
                        <div key={todo.id} className={`todo-single ${todo.important == 1 && 'important'}`}>
                            <h3>{todo.todo}</h3>
                            <p>{todo.description}</p>
                            <span>{todo.important}</span>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default App;
