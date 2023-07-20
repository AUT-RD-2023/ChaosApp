import React from 'react';
import '../App.css';
import Button from '../Button.js'
import Input from '../Input.js'

const Homepage = () => {
    return (
        <div className="App">
            <h1>Kia Rite</h1>
            <div className="button_container">
                <Input name="Game PIN" />
                <Button /*press={joinGame}*/ name="JOIN" />     
            </div>     
            <div className="button">                
                <Button /*press={hostGame}*/ name="HOST" />
            </div>
        </div>
    );
}

export default Homepage;