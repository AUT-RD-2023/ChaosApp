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
import PageNotFound from './pages/404';
import Bridge from './pages/Bridge';
import Message from './pages/Message';

function App() {
  return (     
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ChaosApp' element={<Homepage />} />
        <Route path="/Lobby" element={<LobbyPage />} />
        <Route path="/Lobby/link/:pinNumber" element={<NicknamePage />} /> 
        <Route path="/Host" element={<NicknamePage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Bridge" element={<Bridge />} />
        <Route path="/Message" element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;