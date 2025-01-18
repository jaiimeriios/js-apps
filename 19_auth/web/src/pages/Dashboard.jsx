import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuoteForm from '../components/QuoteForm';

const Dashboard = () => {
    const URL = 'http://localhost:666';
    const { authState, logout } = useAuth();
    const [quote, setQuote] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current quote of the user
        const fetchQuote = async () => {
            try {
                const response = await fetch(`${URL}/quotes`, {
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setQuote(data.quote);
                } else {
                    setError(data.error || 'Failed to fetch quote');
                }
            } catch (error) {
                setError('An error occurred while fetching your quote');
            }
        };

        fetchQuote();
    }, [authState.token]);

    const handleLogOut = () => {
        console.log('log out')
        logout()
        navigate('/');
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {authState.user.username}</p>
            <button onClick={handleLogOut}>Logout</button>

            <h3>Your Quote</h3>
            {quote ? (
                <p>{quote}</p>
            ) : (
                <p>No quote set yet. Update your quote below.</p>
            )}

            <QuoteForm />
        </div>
    );
};

export default Dashboard;
