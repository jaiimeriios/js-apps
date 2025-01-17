import { useTodosProvider } from './context/todosContextProvider';
import { TodosForm } from './components/TodosForm';
import { TodosTodo } from './components/TodosTodo';

function App() {
    const { loading, error } = useTodosProvider();

    return (
        <>
            <h1>Todos</h1>

            <TodosForm />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <TodosTodo />
        </>
    );
}

export default App;
