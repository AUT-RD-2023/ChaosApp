// React
import React, { useState, useRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'

// Styles
import '../App.css';

function NicknamePage() {    
    const location = useLocation();
    const params = useParams();

    const isHost = location.state?.isHost;
    const joinPin = params?.pinNumber;

    if(!isHost) { // Redirects to the 404 page if url contains an incorrect pin code format.
        if(!((joinPin.length === 5) && (/^[0-9\b]+$/.test(joinPin)))) {
            window.location.href = "/404";
        } 
    }

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
                    to="/Lobby"
                    state={{ identity: identity, gamePin: gamePin.current.value, isHost: isHost }}
                >
                    <Button name="NEXT" disabled={ nickname && /\S/.test(nickname) ? false : true } press={handleClick}/>
                </NavLink>
            </div>        
        </div>
    );
}

export default NicknamePage;