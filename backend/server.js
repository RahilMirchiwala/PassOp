const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || 'passOp';

let db;

// Middleware
app.use(bodyParser.json());

// CORS setup: Replace with your frontend URL
app.use(cors({
  origin: 'https://passop.onrender.com',
  credentials: true
}));

// Routes
app.get('/', async (req, res) => {
  try {
    const collection = db.collection('passwords');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
});

app.post('/', async (req, res) => {
  console.log('🔔 POST request received:', req.body); // helpful logging
  try {
    const password = req.body;
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert data', details: err.message });
  }
});

app.delete('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('passwords');
    const result = await collection.deleteOne(password);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete data', details: err.message });
  }
});

// Connect to MongoDB and start the server
async function startServer() {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB Atlas');

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await client.close();
      console.log('\n🛑 MongoDB connection closed');
      process.exit(0);
    });

  } catch (err) {
    console.error('❌ Failed to connect to MongoDB Atlas:', err.message);
    process.exit(1);
  }
}

startServer();
