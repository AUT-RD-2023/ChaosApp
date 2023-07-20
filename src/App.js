import React from 'react';
import './App.css';
import Button from './Button.js'
import Input from './Input.js'

function App() {
  return (
    <div className="App">
            <h1>Kia Rite</h1>
            <h2>GET STARTED</h2>
            <div className="button_container">
                <Input name="Enter Nickname"/>
                <Button /*press={joinGame}*/ name="NEXT"/>
            </div>
    </div>
  );
}

export default App;
