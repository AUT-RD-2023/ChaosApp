// React
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Styles
import "./styles/fonts/rubik-semi-bold.ttf"
import './App.css';

// Pages
import Homepage from './pages/Homepage';
import LobbyPage from './pages/LobbyPage';
import SettingsPage from './pages/SettingsPage.js';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/404';
import Bridge from './pages/Bridge';
import ScenarioPage from './pages/Scenariopage';
import DiscussionPage from './pages/DiscussionPage';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';
import ChaosPage from './pages/ChaosPage';
import TutorialPage from './pages/TutorialPage';
import CelebrationPage from './pages/CelebrationPage';
import GameRecapPage from './pages/GameRecapPage';

function App() {
  return (     
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ChaosApp' element={<Homepage />} />
        <Route path="/Lobby" element={<LobbyPage />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
        <Route path="/Lobby/link/:pinNumber" element={<TutorialPage />} />
        <Route path="/Host" element={<TutorialPage />} />
        <Route path="/Error/:error" element={<ErrorPage />} />
        <Route path="/404" element={<PageNotFound />} /> 
        <Route path="*" element={<PageNotFound />} /> 
        <Route path="/Bridge" element={<Bridge />} />
        <Route path="/Scenario" element={<ScenarioPage />} />
        <Route path="/Discussion" element={<DiscussionPage />} />
        <Route path="/Voting" element={<VotingPage />} />
        <Route path ="/Results" element={<ResultsPage />} />
        <Route path="/Chaos" element={<ChaosPage />} />
        <Route path="/End" element={<CelebrationPage />} />
        <Route path="/Recap" element={<GameRecapPage />} />
      </Routes>
    </div>
  );
}

export default App;