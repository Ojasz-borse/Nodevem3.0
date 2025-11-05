import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId,role) => {
    return jwt.sign({ id: userId ,role}, process.env.JWT_SECRET, {
        expiresIn: '30d',
        
    }); 
};
export const signUp = async (req, res) => {
    try {
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
