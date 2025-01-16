import { useEffect, useState } from 'react';
import { getAllTodos } from './hooks/getAllTodos';

function App() {
    const { allTodos, loading, error } = getAllTodos(
        'http://localhost:666/todos/'
    );

    return (
        <>
            <h1>Todos</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="todos-container">
                {allTodos.length === 0 ? (
                    <p>No todos available</p>
                ) : (
                    allTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className={`todo-single${
                                !todo.important == 1 ? '' : ' important'
                            }`}
                        >
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
