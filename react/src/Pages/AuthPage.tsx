import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // VALÓDI BEJELENTKEZÉS ÉS REGISZTRÁCIÓ LOGIKA
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        // Bejelentkezés: bekérjük a tokent a Djangótól
        const res = await api.post('/api/token/', { username, password });
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        navigate('/hub');
      } else {
        // Regisztráció: Itt egy olyan végpont kell, ami létrehozza a felhasználót
        // Ha még nincs ilyen, az adminban hozz létre usert, és használd a Login-t!
        alert("A regisztráció funkcióhoz külön Django view szükséges. Használd a belépést!");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba a stúdióba lépéskor! Ellenőrizd a felhasználónevet és jelszót.");
    }
  };

  // --- STÍLUSOK (Változatlanul a te Milliomos témád) ---
  const containerStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', background: 'radial-gradient(circle, #2a4365 0%, #1a202c 60%, #000000 100%)',
    fontFamily: 'Roboto, sans-serif', padding: '20px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '50px 40px',
    borderRadius: '20px', boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
    border: '2px solid #3b82f6', width: '100%', maxWidth: '450px',
    textAlign: 'center', backdropFilter: 'blur(10px)',
  };

  const titleStyle: React.CSSProperties = {
    marginBottom: '30px', color: '#fcd34d', fontSize: '2rem',
    fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '15px 20px', margin: '12px 0',
    backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #475569',
    borderRadius: '30px', fontSize: '16px', outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%', padding: '16px', backgroundColor: '#1e3a8a',
    color: '#fcd34d', border: '2px solid #fcd34d', borderRadius: '30px',
    fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase',
    cursor: 'pointer', marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {isLoginView ? 'Játékos Belépés' : 'Új Játékos'}
        </h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Játékosnév" 
            required 
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          {!isLoginView && (
            <input 
              type="email" 
              placeholder="Email cím" 
              required 
              style={inputStyle}
            />
          )}

          <input 
            type="password" 
            placeholder="Jelszó" 
            required 
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={buttonStyle}>
            {isLoginView ? 'Belépés a stúdióba' : 'Regisztráció'}
          </button>
        </form>

        <p style={{ marginTop: '25px', color: '#cbd5e0' }}>
          {isLoginView ? 'Még nem játszottál?' : 'Már regisztráltál?'}
          <span 
            onClick={() => setIsLoginView(!isLoginView)}
            style={{ color: '#fcd34d', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}
          >
            {isLoginView ? 'Jelentkezz itt!' : 'Lépj be!'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;