const express = require('express');
const { addCard, fetchAllCards, fetchCardByTitle } = require('../models/cardModel');

const router = express.Router();

// Route to create a new card
router.post('/cards', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Both title and description are required." });
    }

    const newCard = { title, description, createdAt: new Date() };
    try {
        await addCard(newCard);
        res.status(201).json({ message: "Card created successfully." });
    } catch (err) {
        res.status(500).json({ error: "Failed to create the card." });
    }
});

// Route to get all cards
router.get('/cards', async (req, res) => {
    try {
        const cards = await fetchAllCards();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve the cards." });
    }
});

// Route to get a card by title
router.get('/cards/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const card = await fetchCardByTitle(title);
        if (!card) {
            return res.status(404).json({ error: "Card not found." });
        }
        res.json(card);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve the card." });
    }
});

module.exports = router;
