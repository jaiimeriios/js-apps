import { useState } from 'react';
import { useTodosProvider } from './context/todosContextProvider';

function App() {
    const { todos, loading, error, addTodo, deleteTodo, updateTodo } =
        useTodosProvider();

    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setnewDescription] = useState('');
    const [newIsImportant, setNewIsImportant] = useState(false);

    const [editingID, setEditingID] = useState(null);
    const [editTodo, setEditTodo] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editIsImportant, setEditIsImportant] = useState(false);

    const handleSubmit = async (e) => {
        if (newTodo.trim()) {
            await addTodo(newTodo, newDescription, newIsImportant);
            setNewTodo('');
            setnewDescription('');
            setNewIsImportant(false);
        }
    };

    const handleDelete = (id) => {
        deleteTodo(id);
    };

    const toggleEditTodo = (id, todo, description, important) => {
        setEditingID(id);
        setEditTodo(todo);
        setEditDescription(description);
        setEditIsImportant(important);
    };

    const handleUpdate = async (
        e,
        editID,
        editTodo,
        editDescription,
        editIsImportant
    ) => {
        e.preventDefault();
        await updateTodo(editID, editTodo, editDescription, editIsImportant);
        setEditingID(false);
    };

    return (
        <>
            <h1>Todos</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new Todo"
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setnewDescription(e.target.value)}
                    placeholder="Enter new Todo"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newIsImportant}
                        onChange={(e) => setNewIsImportant(!newIsImportant)}
                    />
                    Important
                </label>

                <button type="submit">Add Todo</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="todos-container">
                {todos.length === 0 ? (
                    <p>No todos available</p>
                ) : (
                    todos.map((todo, i) => (
                        <div key={`todo-${i}`}>
                            {editingID === todo.id ? (
                                <form
                                    onSubmit={(e) =>
                                        handleUpdate(
                                            e,
                                            todo.id,
                                            editTodo,
                                            editDescription,
                                            editIsImportant
                                        )
                                    }
                                >
                                    <input
                                        type="text"
                                        value={editTodo}
                                        onChange={(e) =>
                                            setEditTodo(e.target.value)
                                        }
                                        placeholder="Enter new Todo"
                                    />
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                        placeholder="Enter new Todo"
                                    />
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={editIsImportant}
                                            onChange={(e) =>
                                                setEditIsImportant(
                                                    !editIsImportant
                                                )
                                            }
                                        />
                                        Important
                                    </label>

                                    <button type="submit">Save</button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingID(null)}
                                    >
                                        {' '}
                                        Cancel{' '}
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div
                                        key={`todo-${i}`}
                                        className={`todo-single${
                                            !todo.important == 1
                                                ? ''
                                                : ' important'
                                        }`}
                                    >
                                        <h3>{todo.todo}</h3>
                                        <p>{todo.description}</p>
                                        <span>{todo.important}</span>
                                        <button
                                            onClick={() =>
                                                toggleEditTodo(
                                                    todo.id,
                                                    todo.todo,
                                                    todo.description,
                                                    todo.important
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(todo.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default App;
