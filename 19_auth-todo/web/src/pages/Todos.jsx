import { useAuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';
import TodosAdd from '../components/TodosAdd';
import TodosList from '../components/TodosList';
import { useTodoContext } from '../context/TodosContext';

const Todos = () => {
    const { user } = useAuthContext();
    const { loading, error } = useTodoContext();
    return (
        <>
            <h2>Todo List</h2>
            <h3>{user.user.username}</h3>
            <Logout />
            <TodosAdd />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <TodosList />
        </>
    );
};

export default Todos;
