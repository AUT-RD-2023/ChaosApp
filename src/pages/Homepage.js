import React from 'react';
import '../App.css';
import Button from '../Button.js'
import Input from '../Input.js'
import { NavLink } from 'react-router-dom';

const Homepage = () => {

    return (
        <div className="App">
            <h1>ChaosApp</h1>
            <div className="button_container">
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