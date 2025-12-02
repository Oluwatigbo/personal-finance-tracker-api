require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');  // Using native MongoDB driver
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('finance-tracker');  // Specify your database name
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
connectDB();

// Make db available in routes/controllers (via middleware or direct import)
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transactions', require('./middleware/auth'), require('./routes/transactionRoutes'));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler
app.use(require('./middleware/errorHandler'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));