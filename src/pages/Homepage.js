// React
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'

// Styles
import '../App.css';

const Homepage = () => {
    const [gamePin, setGamePin] = useState("");

    return (
        <div className="App">
            <div className="title">Chaos</div>

            <div className="container">
                <Input 
                    placeholder="Game PIN"
                    maxLength={5}
                    onChange={ (e) => setGamePin(e.target.value) }
                />
                <NavLink to={`/Lobby/link/${gamePin}`} state={{ isHost: false, joinPin: gamePin }}>
                    <Button 
                        name="JOIN" //check if the provided Game Pin is at least 5 characters long, only contains numbers and isn't made up of only whitespace
                        disabled={ (gamePin.length === 5) && (/^[0-9\b]+$/.test(gamePin)) && (/\S/.test(gamePin)) ? false : true }                         
                    />
                </NavLink>
            </div>     
            
            <div className="button">
                <NavLink to="/Host" state={{ isHost: true }}>
                    <Button name="HOST" />
                </NavLink>              
            </div>
        </div>
    );
}

export default Homepage;