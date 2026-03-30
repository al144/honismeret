import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/token/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/hub');
    } catch (err) {
      alert("Hibás játékosnév vagy jelszó!");
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', background: 'radial-gradient(circle, #2a4365 0%, #1a202c 60%, #000000 100%)',
    fontFamily: 'Roboto, sans-serif',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '40px',
    borderRadius: '20px', border: '2px solid #3b82f6', textAlign: 'center',
    width: '100%', maxWidth: '400px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#fcd34d', textTransform: 'uppercase' }}>Belépés a Stúdióba</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" placeholder="Játékosnév" required 
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '20px', border: 'none' }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Jelszó" required 
            style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '20px', border: 'none' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#1e3a8a', color: '#fcd34d', border: '2px solid #fcd34d', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            START
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;