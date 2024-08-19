const { getDatabase } = require('../config/db');

const cardCollection = () => getDatabase().collection('cards'); // Changed the collection name

async function addCard(cardData) {
    return await cardCollection().insertOne(cardData);
}

async function fetchAllCards() {
    return await cardCollection().find({}).toArray();
}

async function fetchCardByTitle(title) {
    return await cardCollection().findOne({
        title: { $regex: new RegExp(title, 'i') }
    });
}

module.exports = { addCard, fetchAllCards, fetchCardByTitle };