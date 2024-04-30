const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const menProductsSchema = require('../schemas/menProductsSchema');
const womenProductsSchema = require('../schemas/womenProductsSchema');
const kidsProductsSchema = require('../schemas/kidsProductsSchema');
const cartItemSchema = require('../schemas/cartItem');
const menProduct = new mongoose.model('menProduct', menProductsSchema)
const womenProduct = new mongoose.model('womenProduct', womenProductsSchema)
const kidsProduct = new mongoose.model('kidsProduct', kidsProductsSchema)
const cartItems = new mongoose.model('cartItems', cartItemSchema)

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
    const newMenProduct = new menProduct(req.body);
    try {
        await newMenProduct.save()
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
    const newWomenProduct = new womenProduct(req.body);
    try {
        await newWomenProduct.save()
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
    const newKidsProduct = new kidsProduct(req.body);
    try {
        await newKidsProduct.save()
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
router.get('/kidsProducts', async (req, res) => {
    try {
        const allKidsProducts = await kidsProduct.find()
        if (!allKidsProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(allKidsProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
router.get('/kidsProducts/:id', async (req, res) => {
    try {
        const kidsProducts = await kidsProduct.findOne({ _id: req.params.id })
        // select method to select specific fields, limit method for specific todo
        if (!kidsProducts) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(kidsProducts)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

// for cart
router.post('/cartItem', async (req, res) => {
    const newCartItem = new cartItems(req.body);
    try {
        await newCartItem.save()
        res.status(200).json({
            message: "product was inserted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a server side error! ${error}`
        });
    }
})

// for wishlist
router.post('/wishlistItem', async (req, res) => {
    const newWishlistItem = new cartItems(req.body);
    try {
        await newWishlistItem.save()
        res.status(200).json({
            message: "product was inserted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a server side error! ${error}`
        });
    }
})
router.get('/cartItem', async (req, res) => {
    try {
        const allCartItems = await cartItems.find()
        if (!allCartItems) {
            return res.status(404).json({ message: 'No products found' })
        }
        return res.status(200).json(allCartItems)
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})
router.delete('/cartItem/:id', async (req, res) => {
    try {
        await cartItems.deleteOne({ _id: req.params.id})
        res.status(200).json({
            message: "cart's item was deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }
})

module.exports = router;