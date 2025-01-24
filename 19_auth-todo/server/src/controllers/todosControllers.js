import { authenticateToken } from '../middleware/authMiddleware.js';
import { getTodos } from '../models/todosModels.js';

export const getAllTodos = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await getTodos(req.userId);
        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};
