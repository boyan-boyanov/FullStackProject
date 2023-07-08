const api = require('../services/userService')

const router = require('express').Router()

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await api.register(email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
})