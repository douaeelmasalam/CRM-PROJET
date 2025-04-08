require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

const app = express();

// 1. Middlewares de sécurité
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// 2. Connexion DB optimisée
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur DB:', err));

// 3. Routes
app.get('/api/health', (req, res) => { /* ... */ });
app.use('/api/auth', authRoutes);

// 4. Gestion des erreurs améliorée
app.use((err, req, res, next) => { /* ... */ });

// 5. Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur en écoute sur http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});