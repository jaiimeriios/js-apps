import { useTodoContext } from '../context/TodosContext';
import { useState } from 'react';

const TodosList = () => {
    const { todos, updateTodo, deleteTodo } = useTodoContext();
    const [editingID, setEditingID] = useState(false);
    const [editTodo, setEditTodo] = useState('');

    const handleDelete = (id) => {
        deleteTodo(id);
    };

    const toggleEditTodo = (id, todo) => {
        setEditingID(id);
        setEditTodo(todo);
    };

    const handleUpdate = async (e, editID, editTodo) => {
        e.preventDefault();
        await updateTodo(editID, editTodo);
        setEditingID(null);
    };

    return (
        <ul>
            {todos.length === 0 ? (
                <p>No todos available</p>
            ) : (
                todos.map((todo, i) => (
                    <div key={`todo-${i}`}>
                        {editingID === todo.id ? (
                            <form
                                onSubmit={(e) =>
                                    handleUpdate(e, todo.id, editTodo)
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
                                <button type="submit">Save</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingID(null)}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <li key={`todo-${i}`}>
                                    {todo.todo}
                                    <button
                                        onClick={() =>
                                            toggleEditTodo(todo.id, todo.todo)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </>
                        )}
                    </div>
                ))
            )}
        </ul>
    );
};

export default TodosList;
