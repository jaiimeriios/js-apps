import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

import userRoutes from './src/routes/userRoutes.js';
import quoteRoutes from './src/routes/quoteRoutes.js';

const PORT = process.env.PORT || 666;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello from server!');
});

// Routes
app.use('/users', userRoutes);
app.use('/quotes', quoteRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
