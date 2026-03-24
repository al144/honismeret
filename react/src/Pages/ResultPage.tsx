import React from 'react';

const ResultsPage: React.FC = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#1a202c', color: '#e2e8f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#fcd34d' }}>Eddigi Eredményeim</h1>
      <p>Itt láthatod a korábbi játékaid eredményeit.</p>
      {/* Ide jön majd az eredmények listája */}
    </div>
  );
};

export default ResultsPage;