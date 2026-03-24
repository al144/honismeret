import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import HubPage from './Pages/HubPage';
import GamePage from './Pages/GamePage';             // Új import
import ResultsPage from './Pages/ResultPage';     // Új import
import QuestionCreatorPage from './Pages/QuestionCreatorPage'; // Új import
import OlahIstvanPage from './Pages/OlahIstvanPage'; // Új import

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/hub" element={<HubPage />} />
        
        {/* Új útvonalak a Hub-ról */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/question-creator" element={<QuestionCreatorPage />} />
        <Route path="/olah-istvan" element={<OlahIstvanPage />} />
      </Routes>
    </Router>
  );
};

export default App;