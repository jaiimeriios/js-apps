import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: 'todo',
});

// Register a new user
export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username);
    console.log(email);
    console.log(hashedPassword);
    const [result] = await pool.query(
        'INSERT INTO auth_users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result;
};

// Find user by email (for login)
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM auth_users WHERE email = ?',
        [email]
    );
    return rows[0];
};

// Validate password
export const validatePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};

// Get user by ID
export const getUserById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM auth_users WHERE id = ?',
        [id]
    );
    return rows[0];
};
