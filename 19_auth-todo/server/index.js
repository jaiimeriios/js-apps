import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

import userRoutes from './src/routes/authRoutes.js';

// Middleware
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Protected routes (example: get all todos)
app.get('/todos', authenticateToken, (req, res) => {
    pool.query(
        'SELECT * FROM auth_todos WHERE user_id = ?',
        [req.userId],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching todos' });
            } else {
                res.json(results);
            }
        }
    );
});

// ... other endpoints for adding, updating, deleting todos

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
