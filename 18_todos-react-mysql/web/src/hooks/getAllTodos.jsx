import { useState, useEffect } from 'react';

export const getAllTodos = (url) => {
    const [allTodos, setAllTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setAllTodos(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);

    return { allTodos, loading, error };
};
