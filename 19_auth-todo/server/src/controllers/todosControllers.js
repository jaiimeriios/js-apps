import { authenticateToken } from '../middleware/authMiddleware.js';
import { getTodos, postTodos } from '../models/todosModels.js';

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

export const createTodo = async (req, res) => {
    authenticateToken(req, res);
    try {
        const result = await postTodos(req.userId, req.body.todo);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};
