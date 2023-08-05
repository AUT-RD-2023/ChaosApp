import React, { useState, useRef } from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'
import {NavLink} from "react-router-dom";

function JoinAbly() {    
    const location = useLocation();
    const isHost = location.state?.isHost;
    const joinPin = location.state?.joinPin;

    const [nickname, setNickname] = useState("");
    const identity = new Identity();

    const handleClick = () => {
        identity.makeNickname(nickname);        
    }

    const gamePin = useRef({ value: isHost ? Math.floor(Math.random() * 99999 + 10000) : joinPin });

    return (
        <div className="App">
            <div className="title">Chaos</div>
            
            <div className="heading">GET STARTED</div>

            <div className="container">
                <Input
                    placeholder="Enter Nickname"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <NavLink
                    to="/lobby"
                    state={{ identity: identity, gamePin: gamePin.current.value }}
                >
                    <Button name="NEXT" disabled={ nickname && /\S/.test(nickname) ? false : true } press={handleClick}/>
                </NavLink>
            </div>            

            <div>
                <p>[DEBUG] {isHost ? `[HOST] The generated Game Pin is ${gamePin.current.value}.` : `[JOIN] The Game Pin of the lobby being joined is ${joinPin}.`}</p>
            </div>
        </div>
    );
}

export default JoinAbly;