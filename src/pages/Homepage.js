import React, { useState } from 'react';
import '../App.css';
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import { NavLink } from 'react-router-dom';

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
                <NavLink to="/ably" state={{ isHost: false, joinPin: gamePin }}>
                    <Button 
                        name="JOIN" //check if the provided Game Pin is at least 5 characters long, only contains numbers and isn't made up of only whitespace
                        disabled={ (gamePin.length == 5) && (/^[0-9\b]+$/.test(gamePin)) && (/\S/.test(gamePin)) ? false : true }                         
                    />
                </NavLink>
            </div>     
            
            <div className="button">
                <NavLink to="/ably" state={{ isHost: true }}>
                    <Button name="HOST" />
                </NavLink>              
            </div>
        </div>
    );
}

export default Homepage;