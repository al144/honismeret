import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const GamePage: React.FC = () => {
  const [quizId, setQuizId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jatek/millionaire/')
      .then(res => {
        setQuizId(res.data.quiz_id);
        setQuestions(res.data.questions);
      })
      .catch(() => navigate('/'));
  }, [navigate]);

  const handleAnswer = async (selected: string) => {
    try {
      const res = await api.post('/jatek/answer/', {
        quiz_id: quizId,
        question_id: questions[currentIdx].id,
        selected_answer: selected
      });

      if (res.data.quiz_active) {
        setCurrentIdx(prev => prev + 1);
      } else {
        localStorage.setItem('last_result', res.data.result);
        navigate('/results');
      }
    } catch (err) {
      alert("Hiba történt!");
    }
  };

  if (questions.length === 0) return <div style={{background: 'black', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Stúdió bevilágítása...</div>;

  const q = questions[currentIdx];

  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#fcd34d' }}>{currentIdx + 1}. Kérdés</h2>
        <div style={{ border: '2px solid #3b82f6', padding: '40px', borderRadius: '50px', margin: '40px 0', background: 'rgba(30, 41, 59, 0.5)' }}>
          <p style={{ fontSize: '1.8rem' }}>{q.question_text}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: '20px', background: 'linear-gradient(to right, #1e293b, #0f172a)', color: 'white', border: '1px solid #3b82f6', borderRadius: '30px', cursor: 'pointer', fontSize: '1.1rem' }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;