import React from 'react';
import '../App.css';
import Button from '../Button.js';
import Input from '../Input.js';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";

const nicknamePage = () => {    
    return(
        <div className="App">
            <Helmet>
                <title>Lobby</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>

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