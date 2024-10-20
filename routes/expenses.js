const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST new expense
router.post('/', async (req, res) => {
    const newExpense = new Expense(req.body);
    try {
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT request to update an expense
router.put('/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json({ message: 'Error updating expense', error: err });
    }
});

// DELETE an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted', expense });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
