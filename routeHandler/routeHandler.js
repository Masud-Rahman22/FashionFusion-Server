const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const menProductsSchema = require('../schemas/menProductsSchema');
const womenProductsSchema = require('../schemas/womenProductsSchema');
const kidsProductsSchema = require('../schemas/kidsProductsSchema');
const menProduct = new mongoose.model('menProduct', menProductsSchema)
const womenProduct = new mongoose.model('womenProduct', womenProductsSchema)
const kidsProduct = new mongoose.model('kidsProduct', kidsProductsSchema)

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

router.post('/womenProducts', async (req, res) => {
    const newProduct = new womenProduct(req.body);
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

router.post('/kidsProducts', async (req, res) => {
    const newProduct = new kidsProduct(req.body);
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
router.get('/womenProducts', async (req, res) => {
    try {
        const allWomenProducts = await womenProduct.find()
        if (!allWomenProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(allWomenProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
router.get('/womenProducts/:id', async (req, res) => {
    try {
        const womenProducts = await womenProduct.findOne({ _id: req.params.id })
        // select method to select specific fields, limit method for specific todo
        if (!womenProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(womenProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

module.exports = router;