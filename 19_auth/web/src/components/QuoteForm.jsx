import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const QuoteForm = () => {
    const URL = 'http://localhost:666';
    const { authState } = useAuth();
    const [quote, setQuote] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/quotes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState.token}`,
                },
                body: JSON.stringify({ quote }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Quote updated successfully!');
            } else {
                alert(data.error || 'Failed to update quote');
            }
        } catch (error) {
            alert('An error occurred while updating the quote');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Enter your quote..."
            />
            <button type="submit">Update Quote</button>
        </form>
    );
};

export default QuoteForm;
