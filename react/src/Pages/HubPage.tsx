import React from 'react';
import { useNavigate } from 'react-router-dom';

const HubPage: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', background: 'radial-gradient(circle, #2a4365 0%, #1a202c 60%, #000000 100%)',
    fontFamily: 'Roboto, sans-serif', color: 'white'
  };

  const buttonStyle: React.CSSProperties = {
    width: '350px', padding: '18px', margin: '12px',
    backgroundColor: '#1e3a8a', color: '#fcd34d',
    border: '2px solid #fcd34d', borderRadius: '30px',
    fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
    transition: 'all 0.3s ease', textTransform: 'uppercase',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#fcd34d', fontSize: '3rem', marginBottom: '40px', textAlign: 'center', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
        LEGYEN ÖN IS MECHWARTOS!
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button style={buttonStyle} onClick={() => navigate('/game')}>
          Játék Indítása
        </button>
        
        <button style={buttonStyle} onClick={() => navigate('/results')}>
          Match History
        </button>
        
        <button style={buttonStyle} onClick={() => navigate('/olah-istvan')}>
          Oláh István és a Mechwart történelme
        </button>

        <button 
          style={{ ...buttonStyle, backgroundColor: '#741b1b', borderColor: '#ff4d4d', marginTop: '30px' }} 
          onClick={() => { localStorage.clear(); navigate('/'); }}
        >
          Kilépés
        </button>
      </div>
    </div>
  );
};

export default HubPage;