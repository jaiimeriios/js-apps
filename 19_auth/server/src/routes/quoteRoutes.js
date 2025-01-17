import express from 'express';
import { protectRoute, isAdmin } from '../controllers/authController.js';
import { getUserById } from '../models/userModels.js';

const router = express.Router();

// Route for authenticated users to update their quote
router.put('/', protectRoute, async (req, res) => {
    const { quote } = req.body;
    const userId = req.user.userId;

    try {
        await promisePool.query(
            'INSERT INTO auth_quotes (user_id, quote) VALUES (?, ?) ON DUPLICATE KEY UPDATE quote = ?',
            [userId, quote, quote]
        );
        res.status(200).json({ message: 'Quote updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating quote' });
    }
});

// Admin route to view all quotes
router.get('/', protectRoute, isAdmin, async (req, res) => {
    try {
        const [quotes] = await promisePool.query('SELECT * FROM auth_quote');
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching quotes' });
    }
});

export default router;
