const router = require('express').Router();
const { response } = require('express');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (user.password !== req.body.password) {
            return res.status(400).json({
                message: 'Password incorrect'
            });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;