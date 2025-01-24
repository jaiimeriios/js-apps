import { useAuthContext } from '../context/AuthContext';
import { useTodoContext } from '../context/TodosContext';

import Logout from '../components/Logout';
import TodosAdd from '../components/TodosAdd';

const Todos = () => {
    const { user } = useAuthContext();
    const { todos, setTodos, loading, error } = useTodoContext();

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
