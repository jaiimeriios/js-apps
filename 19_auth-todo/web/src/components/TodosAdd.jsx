import { useState } from 'react';
import { useTodoContext } from '../context/TodosContext';

const TodosAdd = () => {
    const { addTodo } = useTodoContext();
    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo('');
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
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Todo</button>
            </form>
        </>
    );
};

export default TodosAdd;
