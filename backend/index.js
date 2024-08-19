const express = require('express');
const { connectToDatabase } = require('./config/db');
const cardRoutes = require('./routes/cardRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware Configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'], // Adjust the origins based on your frontend URL
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Default route for the home page
app.get('/', (req, res) => res.send('Welcome to the Help Center API!'));

// Health check route
app.get('/ping', (req, res) => res.send('Help Center API is active.'));

// Use card routes
app.use(cardRoutes);

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
