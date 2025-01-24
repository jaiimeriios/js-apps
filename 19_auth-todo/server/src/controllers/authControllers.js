import jwt from 'jsonwebtoken';

import {
    registerUser,
    getUserByEmail,
    validatePassword,
} from '../models/authModels.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        
        if (!user || !(await validatePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );

        res.json({ token, user });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: 'developent',
        //     sameSite: 'None',
        // }).json({
        //     message: 'Login successful',
        //     token,
        //     user,
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error logging in user' });
    }
};
