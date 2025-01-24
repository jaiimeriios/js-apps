import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthContextProvider } from './context/AuthContext';

import Login from './components/Login';
import Todos from './components/Todos';
import Register from './components/Register';
import Nav from './components/Nav';

const App = () => {
    return (
        <>
            <AuthContextProvider>
                <BrowserRouter>
                        <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register /> } />
                        <Route path="/todos" element={<Todos />} />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
};

export default App;

const Home = () => {
    return (
        <>
            <h1>Home Page</h1>
        </>
    );
};
