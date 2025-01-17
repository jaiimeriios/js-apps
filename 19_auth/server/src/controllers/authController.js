const jwt = require('jsonwebtoken');
const {
    registerUser,
    getUserByEmail,
    validatePassword,
    getUserById,
} = require('../models/userModels.js');

// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('result')
    try {
        const result = await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || !(await validatePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token as a cookie
        res.cookie('token', token, { httpOnly: true }).json({
            message: 'Login successful',
        });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};

// Middleware to protect routes (only accessible by authenticated users)
const protectRoute = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        return res
            .status(401)
            .json({ error: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
};

// Check if user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

module.exports = { register, login, protectRoute, isAdmin };
