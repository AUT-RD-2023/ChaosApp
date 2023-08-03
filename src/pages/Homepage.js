import React from 'react';
import '../App.css';
import Button from '../Button.js'
import Input from '../Input.js'
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";

const Homepage = () => {

    return (
        <div className="App">
            <Helmet>
                <title>Lobby</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>

            <div className="title">Kia Rite</div>
            <div className="container">
                <Input name="Game PIN" />
                <NavLink to="/nickname">
                    <Button name="JOIN"/>
                </NavLink>
            </div>     
            <div className="button">
                <NavLink to="/nickname">
                    <Button name="HOST" />
                </NavLink>              
            </div>
        </div>
    );
}

export default Homepage;