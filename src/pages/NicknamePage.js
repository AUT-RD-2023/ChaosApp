import React from 'react';
import '../App.css';
import Button from '../Button.js';
import Input from '../Input.js';
import { NavLink } from 'react-router-dom';

const nicknamePage = () => {    
    return(
        <div className="App">
            <h1>Kia Rite</h1>
            <div className="button_container">
                <Input name="Enter Name"/>
                <NavLink to="/lobby">
                    <Button name="JOIN"/>
                </NavLink>
            </div>
        </div>
    );
}

export default nicknamePage;