import { useState } from 'react';
import { useTodosProvider } from '../context/todosContextProvider';

export const TodosTodo = () => {
    const { todos, loading, error, deleteTodo, updateTodo } =
        useTodosProvider();

    const [editingID, setEditingID] = useState(null);
    const [editTodo, setEditTodo] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editIsImportant, setEditIsImportant] = useState(false);

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
                                            setEditIsImportant(!editIsImportant)
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
                                        !todo.important == 1 ? '' : ' important'
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
                                        onClick={() => handleDelete(todo.id)}
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
    );
};
