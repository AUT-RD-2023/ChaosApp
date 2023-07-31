import React from 'react';
import '../App.css';
import Button from '../components/Button.js';
import Input from '../components/Input.js';
import { NavLink } from 'react-router-dom';

const nicknamePage = () => {    
    return(
        <div className="App">
            <div className="title">Kia Rite</div>
            <div className="heading">GET STARTED</div>
            <div className="container">
                <Input name="Enter Nickname"/>
                <NavLink to="/lobby">
                    <Button name="NEXT"/>
                </NavLink>
            </div>
        </div>
    );
}

export default nicknamePage;