import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

import userRoutes from './src/routes/authRoutes.js';
import todosRoutes from './src/routes/todosRoutes.js';

// Middleware
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/', todosRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
