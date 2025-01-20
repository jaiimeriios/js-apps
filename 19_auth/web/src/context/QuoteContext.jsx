import { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

// Create a custom hook for easier consumption of context
export const useQuote = () => {
    return useContext(QuoteContext);
};

// Create a provider component
export const QuoteProvider = ({ children }) => {
    const [quote, setQuote] = useState(''); // You can set an initial quote here

    const updateQuote = (newQuote) => {
        setQuote(newQuote);
    };




    

    return (
        <QuoteContext.Provider value={{ quote, updateQuote }}>
            {children}
        </QuoteContext.Provider>
    );
};
