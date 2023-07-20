import React from 'react';
import '../App.css';
import Button from '../Button.js';
import Input from '../Input.js';

const nicknamePage = () => {    
    return(
        <div className="App">
            <h1>Kia Rite</h1>
            <div className="button_container">
                <Input name="Enter Name"/>
                <Button /*press={joinGame}*/ name="Join Session"/>
            </div>
        </div>
    );
}

export default nicknamePage;