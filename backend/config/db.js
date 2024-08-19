const { MongoClient } = require('mongodb');

// Directly define your MongoDB URI here
const uri = 'mongodb://localhost:27017/helpcenterdb'; // Replace with your actual MongoDB connection string
// For MongoDB Atlas:
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/helpCenterDB?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the MongoDB database successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

function getDatabase() {
    return client.db('helpcenterdb'); // Ensure the database name matches your connection string
}

module.exports = { connectToDatabase, getDatabase };