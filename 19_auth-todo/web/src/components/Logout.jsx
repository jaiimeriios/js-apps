import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
