const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');

//for email validation
function isValidEmail(email) {
    //email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const signup = async (req, res, next) => {
    const { name, username, email, password } = req.body;

    try {
        // Input Validation
        if (!name || !username || !email || !password) {
            return res.status(400).json('All fields are required');
        }
        if (!isValidEmail(email)) {
            return res.status(400).json('Invalid email format');
        }
        // Check if user already exists (case-insensitive)
        const existingUser = await User.findOne({
            $or: [{ username: { $regex: new RegExp(`^${username}$`, 'i') } }, { email: { $regex: new RegExp(`^${email}$`, 'i') } }]
        });

        if (existingUser) {
            return res.status(409).json('User already exists');
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json('User created successfully!');

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Input Validation
        if (!email || !password) {
            return res.status(400).join('Email and password are required');
        }

        const validUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }); // Case-insensitive email search
        if (!validUser) return res.status(404).join('User not found!');
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).join('Wrong credentials!');
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

const google = async (req, res, next) => {
    try {
        // Input Validation
        if (!req.body.email || !req.body.name) {
            return res.status(400).json('Missing required Google profile information');
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            let username = req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);

            // Check for username collision (you can add a retry mechanism if needed)
            let existingUsername = await User.findOne({ username });
            while (existingUsername) {
                username = req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);
                existingUsername = await User.findOne({ username });
            }

            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: username, 
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo, 
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

module.exports = { google, signOut, login, signup };