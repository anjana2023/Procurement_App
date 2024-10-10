// routes/index.js
import express from 'express';
import Item from '../models/ItemModels.js';
import Order from '../models/orderModel.js';

const router = express.Router();

// Item Routes
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/items', async (req, res) => {
    console.log(req.body,".....................items")
    const newItem = new Item(req.body);
    console.log(newItem)
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Order Routes
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.itemId'); // Populate item details
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/orders', async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
