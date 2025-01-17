import { useState } from 'react';
import { useTodosProvider } from '../context/todosContextProvider';

export const TodosForm = () => {
    const { addTodo } = useTodosProvider();

    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setnewDescription] = useState('');
    const [newIsImportant, setNewIsImportant] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            await addTodo(newTodo, newDescription, newIsImportant);
            setNewTodo('');
            setnewDescription('');
            setNewIsImportant(false);
        }
    };

    return (
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
    );
};
