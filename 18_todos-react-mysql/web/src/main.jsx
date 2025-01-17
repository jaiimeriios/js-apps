import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './syles.css';
import App from './App.jsx';
import { TodosProvider } from './context/todosContextProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TodosProvider>
            <App />
        </TodosProvider>
    </StrictMode>
);
