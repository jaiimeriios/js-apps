import express from 'express';
import { protectRoute, isAdmin } from '../controllers/authController.js';
import { getUserById } from '../models/userModels.js';

const router = express.Router();

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: 'todo',
});

// Admin route to view all quotes
router.get('/', protectRoute, async (req, res) => {
    const userId = req.user.userId;
    try {
        const [quotes] = await pool.query(`SELECT * FROM auth_quotes WHERE user_id = ${userId}`);
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching quotes' });
    }
});

// Route for authenticated users to update their quote
router.put('/', protectRoute, async (req, res) => {
    const { quote } = req.body;
    const userId = req.user.userId;

    try {
        await pool.query(
            'INSERT INTO auth_quotes (user_id, quote) VALUES (?, ?) ON DUPLICATE KEY UPDATE quote = ?',
            [userId, quote, quote]
        );
        res.status(200).json({ message: 'Quote updated successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error updating quote ...' });
    }
});

export default router;
