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
        <Route path="/Nickname" element={<NicknamePage />} />
        <Route path="/Lobby" element={<LobbyPage />} />
        <Route path="/Host" element={<Ably />} />
        <Route path="/Lobby/:pinNumber" element={<Ably />} /> 
      </Routes>
    </div>
  );
}
// <Route path="/:pinNumber" render={(props) => <Ably joinPin={pinNumber} isHost={false}  {...props} /> } />
export default App;