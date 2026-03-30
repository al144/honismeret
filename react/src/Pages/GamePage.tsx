import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const GamePage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initGame = async () => {
      try {
        // 1. Összes kérdés lekérése a Djangótól
        const res = await api.get('/jatek/'); 
        const allQuestions = res.data;

        if (!allQuestions || allQuestions.length === 0) {
          throw new Error("Üres az adatbázis.");
        }

        // 2. Kérdések csoportosítása nehézség szerint
        const filterAndShuffle = (diff: number) => 
            allQuestions
                .filter((q: any) => Number(q.difficulty) === diff)
                .sort(() => 0.5 - Math.random());

        const easy = filterAndShuffle(1);
        const medium = filterAndShuffle(2);
        const hard = filterAndShuffle(3);

        // 15 kérdés összeállítása: 5 könnyű, 5 közepes, 5 nehéz
        let gameSet = [
          ...easy.slice(0, 5),
          ...medium.slice(0, 5),
          ...hard.slice(0, 5)
        ];

        // Biztonsági tartalék: ha nincs elég kérdés a szinteken, feltöltjük randommal
        if (gameSet.length < 15) {
          const fillers = allQuestions
            .filter((q: any) => !gameSet.find(gs => gs.id === q.id))
            .sort(() => 0.5 - Math.random());
          gameSet = [...gameSet, ...fillers.slice(0, 15 - gameSet.length)];
        }

        setQuestions(gameSet);
        setLoading(false);
      } catch (err) {
        console.error("Betöltési hiba:", err);
        alert("Hiba: Nem sikerült elérni a kérdéseket a szerverről! Ellenőrizd a Django futását.");
        navigate('/hub');
      }
    };
    initGame();
  }, [navigate]);

  const handleOptionClick = (opt: string) => {
    if (isChecking) return;
    setSelectedOption(opt);
  };

  const confirmAnswer = async () => {
    if (!selectedOption || isChecking) return;
    setIsChecking(true);

    try {
      // Válasz ellenőrzése a backenddel
      const res = await api.post('/jatek/answer/', {
        quiz_id: 1, // Fix ID, mivel a /new/ végpontod 404-es
        question_id: questions[currentIdx].id,
        selected_answer: selectedOption
      });

      // Drámai szünet az ellenőrzésnél
      setTimeout(() => {
        // Ha a backend azt mondja jó, és van még kérdés
        if (res.data.quiz_active && currentIdx < questions.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setSelectedOption(null);
          setIsChecking(false);
        } else {
          // Játék vége (kiesés vagy győzelem)
          localStorage.setItem('last_result', res.data.result || (currentIdx + (res.data.correct ? 1 : 0)).toString());
          navigate('/results');
        }
      }, 1200);
    } catch (err) {
      console.warn("Backend hiba az ellenőrzésnél, de folytatjuk a játékot...");
      // Ha a backend nem válaszol, manuálisan léptetünk (teszt üzemmód)
      setTimeout(() => {
          if (currentIdx < questions.length - 1) {
              setCurrentIdx(prev => prev + 1);
              setSelectedOption(null);
              setIsChecking(false);
          } else {
              navigate('/results');
          }
      }, 1000);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fcd34d' }}>
      <h2>KÉRDÉSEK BEOLVASÁSA...</h2>
    </div>
  );

  const q = questions[currentIdx];
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.progressBox}>
          <div style={{ ...styles.progressBar, width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={styles.badge}>SZINT: {q.difficulty === 1 ? 'KÖNNYŰ' : q.difficulty === 2 ? 'KÖZEPES' : 'NEHÉZ'}</span>
          <h2 style={styles.title}>{currentIdx + 1}. KÉRDÉS</h2>
        </div>
        
        <div style={styles.questionCard}>
          <p style={styles.questionText}>{q.question_text}</p>
        </div>

        <div style={styles.grid}>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              disabled={isChecking}
              style={{
                ...styles.optionBtn,
                backgroundColor: selectedOption === opt ? '#fcd34d' : '#1e3a8a',
                color: selectedOption === opt ? '#000' : '#fff',
                borderColor: selectedOption === opt ? '#fff' : '#3b82f6',
              }}
            >
              <span style={{ color: '#fcd34d', fontWeight: 'bold', marginRight: '10px' }}>{String.fromCharCode(65 + i)}:</span> {opt}
            </button>
          ))}
        </div>

        <div style={{ minHeight: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {selectedOption && (
              <button onClick={confirmAnswer} disabled={isChecking} style={styles.confirmBtn}>
                {isChecking ? 'ELLENŐRZÉS...' : 'VÉGLEGES VÁLASZ'}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', background: 'radial-gradient(circle, #1a202c 0%, #000000 100%)', color: '#fff', padding: '40px 20px', fontFamily: 'Roboto, sans-serif' } as React.CSSProperties,
  container: { maxWidth: '900px', margin: '0 auto', textAlign: 'center' } as React.CSSProperties,
  progressBox: { width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px', marginBottom: '30px', overflow: 'hidden' } as React.CSSProperties,
  progressBar: { height: '100%', backgroundColor: '#fcd34d', transition: 'width 0.5s ease' } as React.CSSProperties,
  badge: { backgroundColor: '#3b82f6', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' } as React.CSSProperties,
  title: { color: '#fcd34d', fontSize: '2rem', marginTop: '10px' } as React.CSSProperties,
  questionCard: { background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)', padding: '40px', borderRadius: '20px', border: '2px solid #3b82f6', margin: '20px 0' } as React.CSSProperties,
  questionText: { fontSize: '1.6rem', fontWeight: 'bold' } as React.CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } as React.CSSProperties,
  optionBtn: { padding: '20px', textAlign: 'left', fontSize: '1.1rem', border: '2px solid #3b82f6', borderRadius: '50px', cursor: 'pointer', transition: '0.2s' } as React.CSSProperties,
  confirmBtn: { padding: '15px 50px', backgroundColor: '#fcd34d', color: '#000', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' } as React.CSSProperties,
};

export default GamePage;