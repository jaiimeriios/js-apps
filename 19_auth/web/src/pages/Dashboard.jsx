import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuoteForm from '../components/QuoteForm';
import { useQuote } from '../context/QuoteContext';

const Dashboard = () => {
    const URL = 'http://localhost:666';
    const navigate = useNavigate();
    const { authState, logout } = useAuth();
    const { quote, updateQuote } = useQuote();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch(`${URL}/quotes`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await response.json();
                const latestQuote = data.reverse();

                if (response.ok) {
                    updateQuote(latestQuote[0].quote);
                } else {
                    console.log('Failed to fetch quote');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchQuote();
    }, [authState]);

    const handleLogOut = () => {
        logout();
        navigate('/');
    };

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
