import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { hello } from '../mqtt-server.js';

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picture,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            imporessions: Math.floor(Math.random() * 1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});   
    }

}

export const login = async (req, res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(404).json({message: "User not found"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid password"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user, token});
        hello()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}