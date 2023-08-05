import React, { useState } from 'react';
import '../App.css';
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'
import {NavLink} from "react-router-dom";

function JoinAbly() {
    const [nickname, setNickname] = useState("");
    const identity = createIdentity();
    const handleClick = () => {
        identity.makeNickname(nickname);
    }

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
                    state={{ identity: identity }}
                >
                    <Button name="NEXT" press={handleClick}/>
                </NavLink>

            </div>
        </div>
    );
}

function createIdentity() {
    return new Identity();
}

export default JoinAbly;