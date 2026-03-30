import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const GamePage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();


  const prizes = [
    "50.000.000 Ft", "20.000.000 Ft", "10.000.000 Ft", "5.000.000 Ft", "2.000.000 Ft",
    "1.000.000 Ft", "500.000 Ft", "200.000 Ft", "100.000 Ft", "50.000 Ft",
    "25.000 Ft", "10.000 Ft", "5.000 Ft", "2.000 Ft", "1.000 Ft"
  ].reverse();

  useEffect(() => {
    const initGame = async () => {
      try {
        const res = await api.get('/jatek/millionaire/'); 
        if (res.data.questions) {
          setQuestions(res.data.questions);
          localStorage.setItem('current_quiz_id', res.data.quiz_id);
        }
        setLoading(false);
      } catch (err) {
        navigate('/hub');
      }
    };
    initGame();
  }, [navigate]);
  const [gameLog, setGameLog] = useState<any[]>([]); // Új state a válaszok gyűjtéséhez
  const confirmAnswer = async () => {
  if (selectedOption === null || isChecking) return;
  setIsChecking(true);

  const q = questions[currentIdx];
  const letterOptions = ["A", "B", "C", "D"];
  const selectedLetter = letterOptions[selectedOption];
  const isCorrect = selectedLetter === q.correct_answer;

  // Elmentjük a mostani választ a naplóba
  const currentStep = {
    question_text: q.text,
    user_answer: `${selectedLetter}: ${[q.answer_a, q.answer_b, q.answer_c, q.answer_d][selectedOption]}`,
    correct_answer: `${q.correct_answer}: ${[q.answer_a, q.answer_b, q.answer_c, q.answer_d][letterOptions.indexOf(q.correct_answer)]}`,
    is_correct: isCorrect
  };
  
  const newLog = [...gameLog, currentStep];
  setGameLog(newLog);

  setTimeout(async () => {
    if (isCorrect && currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsChecking(false);
    } else {
      // JÁTÉK VÉGE - ADATOK KÜLDÉSE A BACKENDRE
      try {
        await api.post('/jatek/save_result/', {
          total_prize: isCorrect ? prizes[currentIdx] : (currentIdx > 0 ? prizes[currentIdx - 1] : "0 Ft"),
          correct_count: isCorrect ? currentIdx + 1 : currentIdx,
          details: newLog
        });
      } catch (err) {
        console.error("Hiba a mentéskor", err);
      }
      navigate('/results');
    }
  }, 1500);
};
  if (loading || questions.length === 0) return <div style={styles.loader}>KÉRDÉSEK BEOLVASÁSA...</div>;

  const q = questions[currentIdx];
  const options = [q.answer_a, q.answer_b, q.answer_c, q.answer_d];

  return (
    <div style={styles.background}>
      <div style={styles.moneyTower}>
        {prizes.slice().reverse().map((prize, index) => {
          const stepLevel = 14 - index;
          return (
            <div key={index} style={{
              ...styles.moneyStep,
              color: stepLevel === currentIdx ? '#000' : (stepLevel % 5 === 4 ? '#fff' : '#fcd34d'),
              backgroundColor: stepLevel === currentIdx ? '#fcd34d' : 'transparent',
              fontWeight: stepLevel === currentIdx ? 'bold' : 'normal'
            }}>
              <span style={{ marginRight: '10px' }}>{stepLevel + 1}</span> {prize}
            </div>
          );
        })}
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
            <span style={styles.badge}>SZINT: {q.difficulty === 1 ? 'KÖNNYŰ' : 'HALADÓ'}</span>
            <h1 style={styles.prizeDisplay}>NYEREMÉNY: {prizes[currentIdx]}</h1>
        </div>

        <div style={styles.questionCard}>
          <p style={styles.questionText}>{q.text}</p>
        </div>

        <div style={styles.grid}>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !isChecking && setSelectedOption(i)}
              style={{
                ...styles.optionBtn,
                backgroundColor: selectedOption === i ? '#fcd34d' : '#0a0a2e',
                color: selectedOption === i ? '#000' : '#fff',
                border: selectedOption === i ? '2px solid #fff' : '2px solid #3b82f6'
              }}
            >
              <span style={styles.letter}>{String.fromCharCode(65 + i)}:</span> {opt}
            </button>
          ))}
        </div>

        <div style={styles.actionArea}>
          {selectedOption !== null && (
            <button onClick={confirmAnswer} disabled={isChecking} style={styles.confirmBtn}>
              {isChecking ? 'LÁSSUK...' : 'VÉGLEGES VÁLASZ'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', fontFamily: 'sans-serif' } as React.CSSProperties,
  moneyTower: { width: '250px', background: 'rgba(0,0,0,0.8)', borderRight: '2px solid #3b82f6', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' } as React.CSSProperties,
  moneyStep: { padding: '2px 10px', fontSize: '0.9rem', marginBottom: '2px', borderRadius: '5px' } as React.CSSProperties,
  container: { flex: 1, padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' } as React.CSSProperties,
  header: { marginBottom: '30px' } as React.CSSProperties,
  prizeDisplay: { color: '#fcd34d', fontSize: '2.5rem', textShadow: '2px 2px #000' } as React.CSSProperties,
  badge: { background: '#3b82f6', padding: '5px 15px', borderRadius: '20px' } as React.CSSProperties,
  questionCard: { background: 'linear-gradient(to bottom, #1e3a8a, #000)', padding: '40px', borderRadius: '50px', border: '3px solid #3b82f6', marginBottom: '40px', boxShadow: '0 0 20px #3b82f6' } as React.CSSProperties,
  questionText: { fontSize: '1.8rem', fontWeight: 'bold' } as React.CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } as React.CSSProperties,
  optionBtn: { padding: '20px', borderRadius: '50px', fontSize: '1.2rem', textAlign: 'left', cursor: 'pointer' } as React.CSSProperties,
  letter: { color: '#fcd34d', fontWeight: 'bold', marginRight: '10px' } as React.CSSProperties,
  confirmBtn: { padding: '15px 40px', backgroundColor: '#fcd34d', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', border: 'none' } as React.CSSProperties,
  actionArea: { marginTop: '30px', height: '60px' } as React.CSSProperties,
  loader: { minHeight: '100vh', background: '#000', color: '#fcd34d', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem' } as React.CSSProperties
};

export default GamePage;