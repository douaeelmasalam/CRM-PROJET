import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Utilisation de l'instance Axios configurée
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('douae.ms@gmail.com'); // Valeur par défaut pour le test
  const [password, setPassword] = useState('douae2005%2F*'); // Valeur par défaut pour le test
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    
    try {
      // Utilisation de l'instance api au lieu de axios directement
      const response = await api.post('/auth/login', { email, password });

      // Stockage du token et des données utilisateur
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      // Redirection selon le rôle
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      
    } catch (err) {
      // Gestion améliorée des erreurs
      console.error('Login error:', err);
      
      if (err.response) {
        setError(err.response.data?.error || 'Identifiants incorrects');
      } else if (err.request) {
        setError('Le serveur ne répond pas');
      } else {
        setError('Erreur lors de la configuration de la requête');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="brand-section">
        <div className="brand-logo">
          <span className="crm-text">CRM</span>
          <span className="miacorp-text">MIACORP</span>
        </div>
        <p className="brand-subtitle">SERVICES INFORMATIQUES</p>
      </div>

      <div className="form-section">
        <div className="form-container">
          <h2>CONNEXION</h2>
          <p className="form-subtitle">Accédez à votre espace personnel</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <div className="input-underline"></div>
            </div>

            <div className="input-container">
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <div className="input-underline"></div>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>SE CONNECTER</span>
                  <div className="btn-underline"></div>
                </>
              )}
            </button>
          </form>

          <a href="#" className="forgot-password">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;