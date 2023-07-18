import React from 'react';
import ditto from './ditto.png';
import './App.css';
import Button from './Button.js'
import Input from './Input.js'

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ditto} className="App-logo" alt="logo" />
          <h1>Kia Rite</h1>
          <Input name="Test"/>
          <Button /*press={joinGame}*/ name="JOIN"/>
          <br />
          <Button /*press={hostGame}*/ name="HOST"/>
      </header>
    </div>
  );
}

export default App;