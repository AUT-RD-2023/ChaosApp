import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

// Fonts
import "./styles/fonts/rubik-semi-bold.ttf"

// Pages
import Homepage from './pages/Homepage';
import LobbyPage from './pages/LobbyPage';
import NicknamePage from './pages/NicknamePage';

function App() {
  return (     
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ChaosApp' element={<Homepage />} />
        <Route path="/nickname" element={<NicknamePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
      </Routes>
    </div>
  );
}

export default App;