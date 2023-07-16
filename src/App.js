import React from 'react';
import ditto from './ditto.png';
import './App.css';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ditto} className="App-logo" alt="logo" />
        <p>
          The beginnings of the Chaos App.
        </p>
      </header>
    </div>
  );
}

export default App;

