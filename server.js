require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crm-db')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Route test
app.get('/', (req, res) => {
  res.send('API CRM fonctionnelle');
});

// Port d'écoute
const PORT = process.env.PORT || 3001; // Différent du port React (3000)
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});