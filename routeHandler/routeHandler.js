const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');

// jwt related api
router.post('/jwt', async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        res.send({ token });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
module.exports = router;