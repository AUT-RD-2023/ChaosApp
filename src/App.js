import React from 'react';
import ditto from './ditto.png';
import './App.css';
import Button from './Button.js';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ditto} className="App-logo" alt="logo" />
          <h1>Kia Rite</h1>
          <Button /*press={joinGame}*/ name="Join Game"/>
          <Button /*press={hostGame}*/ name="Host Game"/>
        <p>
          The beginnings of the Chaos App.
        </p>
      </header>
    </div>
  );
}

export default App;

