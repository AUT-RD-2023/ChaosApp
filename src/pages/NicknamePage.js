import React from 'react';
import '../App.css';
import Button from '../Button.js';
import Input from '../Input.js';
import { NavLink } from 'react-router-dom';

const nicknamePage = () => {    
    return(
        <div className="App">
            <h1>ChaosApp</h1>
            <h2>GET STARTED</h2>
            <div className="button_container">
                <Input name="Enter Nickname"/>
                <NavLink to="/lobby">
                    <Button name="NEXT"/>
                </NavLink>
            </div>
        </div>
    );
}

export default nicknamePage;