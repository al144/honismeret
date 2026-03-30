import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const score = localStorage.getItem('last_result') || '0';

  return (
    <div style={{ minHeight: '100vh', background: '#1a202c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <h1 style={{ color: '#fcd34d' }}>JÁTÉK VÉGE</h1>
      <p style={{ fontSize: '2rem' }}>Helyes válaszok száma: {score}</p>
      <button onClick={() => navigate('/hub')} style={{ marginTop: '30px', padding: '15px 30px', background: '#1e3a8a', color: '#fcd34d', border: '2px solid #fcd34d', borderRadius: '10px', cursor: 'pointer' }}>
        Vissza a főmenübe
      </button>
    </div>
  );
};

export default ResultPage;