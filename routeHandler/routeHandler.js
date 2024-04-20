const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const menProductsSchema = require('../schemas/menProductsSchema');
const menProduct = new mongoose.model('menProduct', menProductsSchema)

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

router.post('/menProducts', async (req, res) => {
    const newProduct = new menProduct(req.body);
    try {
        await newProduct.save()
        res.status(200).json({
            message: "product was inserted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a server side error! ${error}`
        });
    }
})

router.get('/menProducts', async (req, res) => {
    try {
        const allMenProducts = await menProduct.find()
        if (!allMenProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(allMenProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
router.get('/menProducts/:id', async (req, res) => {
    try {
        const menProducts = await menProduct.findOne({ _id: req.params.id })
        // select method to select specific fields, limit method for specific todo
        if (!menProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(menProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

module.exports = router;