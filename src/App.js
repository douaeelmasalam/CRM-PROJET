// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';

// Export par défaut DIRECT
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
