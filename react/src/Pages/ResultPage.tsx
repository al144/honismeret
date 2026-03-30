import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jatek/history/').then(res => setHistory(res.data)).catch(() => alert("Hiba a betöltéskor"));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '40px' }}>
      <h1 style={{ color: '#fcd34d', textAlign: 'center' }}>JÁTÉKTÖRTÉNET</h1>
      <center><button onClick={() => navigate('/game')} style={btnStyle}>ÚJ JÁTÉK</button></center>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '30px' }}>
        {history.map(game => (
          <div key={game.id} style={{ border: '1px solid #3b82f6', borderRadius: '10px', marginBottom: '15px', overflow: 'hidden' }}>
            <div 
              onClick={() => setExpandedId(expandedId === game.id ? null : game.id)}
              style={{ padding: '20px', background: '#111', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(game.date).toLocaleString('hu-HU')}</div>
                <div style={{ fontSize: '1.4rem', color: '#fcd34d', fontWeight: 'bold' }}>{game.total_prize}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>{game.correct_count} helyes válasz</div>
                <div style={{ color: '#3b82f6' }}>{expandedId === game.id ? '▲ Kevesebb' : '▼ Részletek'}</div>
              </div>
            </div>

            {expandedId === game.id && (
              <div style={{ padding: '20px', background: '#050505', borderTop: '1px solid #333' }}>
                {game.details.map((d: any, i: number) => (
                  <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                    <p style={{ margin: '0 0 5px 0' }}><strong>{i + 1}. {d.question_text}</strong></p>
                    <p style={{ margin: '0', color: d.is_correct ? '#4ade80' : '#f87171' }}>Válaszod: {d.user_answer}</p>
                    {!d.is_correct && <p style={{ margin: '0', color: '#4ade80' }}>Helyes válasz: {d.correct_answer}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const btnStyle = { padding: '10px 30px', background: '#fcd34d', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' };

export default ResultPage;