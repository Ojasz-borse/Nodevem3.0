import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',

    });
};
export const signUp = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role,
        });

        await newUser.save();

        const token = generateToken(newUser._id, newUser.role);

        res.status(201).json({
            success: true,
            message: "User created",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        });
    } catch (error) {
        console.error('Error in user controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const login = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const { email, password } = req.body;
        if (!email || !password || typeof password !== 'string') {
            return res.status(400).json({ message: "Email and password are required and must be strings" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user._id, user.role);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
