import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthContextProvider } from './context/AuthContext';
import { TodoContextProvider } from './context/TodosContext';

import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

const App = () => {
    return (
        <>
            <AuthContextProvider>
                <TodoContextProvider>
                    <BrowserRouter>
                        <Nav />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/todos" element={<Todos />} />
                        </Routes>
                    </BrowserRouter>
                </TodoContextProvider>
            </AuthContextProvider>
        </>
    );
};

export default App;
