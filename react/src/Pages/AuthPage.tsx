import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // A logikát a backendes kolléga intézi, mi csak a UI-t pörgetjük tovább a Hub-ra
    navigate('/hub');
  };

  // Stílusok a "Legyen Ön is Milliomos" témához
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // Drámai stúdiófény hatás (középen világosabb, széleken sötét)
    background: 'radial-gradient(circle, #2a4365 0%, #1a202c 60%, #000000 100%)',
    fontFamily: 'Roboto, sans-serif',
    padding: '20px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Félig átlátszó sötétkék
    padding: '50px 40px',
    borderRadius: '20px',
    // Kékessárga ragyogás a kártya körül
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(252, 211, 77, 0.1)',
    border: '2px solid #3b82f6', // Kék keret
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)', // Üveghatás
  };

  const titleStyle: React.CSSProperties = {
    marginBottom: '30px',
    color: '#fcd34d', // Arany szín
    fontSize: '2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px 20px',
    margin: '12px 0',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    border: '1px solid #475569',
    borderRadius: '30px', // Jellemző lekerekített forma (pill)
    boxSizing: 'border-box',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#1e3a8a', // Mélykék
    color: '#fcd34d', // Arany szöveg
    border: '2px solid #fcd34d',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  };

  const textStyle: React.CSSProperties = {
    marginTop: '25px',
    color: '#cbd5e0',
    fontSize: '15px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#fcd34d',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '5px',
    transition: 'text-shadow 0.2s',
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
            onFocus={(e) => e.target.style.borderColor = '#fcd34d'}
            onBlur={(e) => e.target.style.borderColor = '#475569'}
          />
          
          {!isLoginView && (
            <input 
              type="email" 
              placeholder="Email cím" 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#fcd34d'}
              onBlur={(e) => e.target.style.borderColor = '#475569'}
            />
          )}

          <input 
            type="password" 
            placeholder="Jelszó" 
            required 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#fcd34d'}
            onBlur={(e) => e.target.style.borderColor = '#475569'}
          />

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '#fcd34d';
              e.currentTarget.style.color = '#1e3a8a';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(252, 211, 77, 0.5)';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '#1e3a8a';
              e.currentTarget.style.color = '#fcd34d';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            }}
          >
            {isLoginView ? 'Belépés a stúdióba' : 'Regisztráció'}
          </button>
        </form>

        <p style={textStyle}>
          {isLoginView ? 'Még nem játszottál?' : 'Már regisztráltál?'}
          <span 
            onClick={() => setIsLoginView(!isLoginView)}
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.textShadow = '0 0 8px rgba(252, 211, 77, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.textShadow = 'none'}
          >
            {isLoginView ? 'Jelentkezz itt!' : 'Lépj be!'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;