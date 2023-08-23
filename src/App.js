// React
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Styles
import "./styles/fonts/rubik-semi-bold.ttf"
import './App.css';

// Pages
import Homepage from './pages/Homepage';
import LobbyPage from './pages/LobbyPage';
import NicknamePage from './pages/NicknamePage';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/404';
import Bridge from './pages/Bridge';
import ScenarioPage from './pages/Scenariopage';
import Message from './pages/Message';
import DiscussionPage from './pages/DiscussionPage';

function App() {
  return (     
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ChaosApp' element={<Homepage />} />
        <Route path="/Lobby" element={<LobbyPage />} />
        <Route path="/Lobby/link/:pinNumber" element={<NicknamePage />} /> 
        <Route path="/Host" element={<NicknamePage />} />
        <Route path="/Error/:error" element={<ErrorPage />} />
        <Route path="/404" element={<PageNotFound />} /> 
        <Route path="*" element={<PageNotFound />} /> 
        <Route path="/Bridge" element={<Bridge />} />
        <Route path="/Scenario" element={<ScenarioPage />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Discussion" element={<DiscussionPage />} />
      </Routes>
    </div>
  );
}

export default App;