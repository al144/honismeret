import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import HubPage from './Pages/HubPage';
import GamePage from './Pages/GamePage';
import ResultsPage from './Pages/ResultPage';
import OlahIstvanPage from './Pages/OlahIstvanPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/olah-istvan" element={<OlahIstvanPage />} />
      </Routes>
    </Router>
  );
};

export default App;