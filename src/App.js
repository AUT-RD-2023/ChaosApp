import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

// Fonts
import "./styles/fonts/rubik-semi-bold.ttf"

// Pages
import Homepage from './pages/Homepage';
import LobbyPage from './pages/LobbyPage';
import NicknamePage from './pages/NicknamePage';
import Ably from './pages/Ably';

function App() {
  return (     
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ChaosApp' element={<Homepage />} />
        <Route path="/nickname" element={<NicknamePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/ably" element={<Ably />} />
      </Routes>
    </div>
  );
}

export default App;