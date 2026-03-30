import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const GamePage: React.FC = () => {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Játék inicializálása a backendről
  useEffect(() => {
    const initGame = async () => {
      try {
        const response = await api.get('/jatek/millionaire/'); //
        setQuizId(response.data.quiz_id);
        setQuestions(response.data.questions);
      } catch (err) {
        console.error("Nem sikerült elindítani a játékot", err);
      }
    };
    initGame();
  }, []);

  const handleAnswer = async (selected: string) => {
    if (!quizId || !questions[currentIndex]) return;

    try {
      const response = await api.post('/jatek/answer/', { //
        quiz_id: quizId,
        question_id: questions[currentIndex].id,
        selected_answer: selected
      });

      if (response.data.quiz_active) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Ha vége a játéknak (rossz válasz vagy elfogytak a kérdések)
        alert(`Játék vége! Eredmény: ${response.data.result}`);
        navigate('/results');
      }
    } catch (err) {
      alert("Hiba a válasz beküldésekor.");
    }
  };

  if (questions.length === 0) return <div>Betöltés...</div>;
  const q = questions[currentIndex];

  return (
    <div className="game-screen">
      <h1>{currentIndex + 1}. Kérdés</h1>
      <p>{q.question_text}</p>
      <div className="options">
        {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </div>
  );
};

export default GamePage;