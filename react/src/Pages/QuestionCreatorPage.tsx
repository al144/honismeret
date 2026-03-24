import React from 'react';

const QuestionCreatorPage: React.FC = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#1a202c', color: '#e2e8f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#fcd34d' }}>Kérdés Kreátor</h1>
      <p>Adj hozzá új kérdéseket a Milliomos adatbázisához!</p>
      {/* Ide jön majd a kérdésfeltevő űrlap */}
    </div>
  );
};

export default QuestionCreatorPage;