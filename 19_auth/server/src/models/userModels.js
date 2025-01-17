const mysql = require('mysql2')
const bcrypt = require('bcryptjs')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: 'todo',
});
const promisePool = pool.promise();

// Register a new user
const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await promisePool.query(
        'INSERT INTO auth_users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result;
};

// Find user by email (for login)
const getUserByEmail = async (email) => {
    const [rows] = await promisePool.query(
        'SELECT * FROM auth_users WHERE email = ?',
        [email]
    );
    return rows[0];
};

// Validate password
const validatePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};

// Get user by ID
const getUserById = async (id) => {
    const [rows] = await promisePool.query('SELECT * FROM auth_users WHERE id = ?', [
        id,
    ]);
    return rows[0];
};


module.exports = {registerUser, getUserByEmail, validatePassword, getUserById}