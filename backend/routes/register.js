const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// POST /api/v1/register
router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    // Basic validation
    if (!name || !username || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Additional validation if needed

    try {
        let userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ msg: 'user already exists' });
        }
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password:hashedPassword });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
