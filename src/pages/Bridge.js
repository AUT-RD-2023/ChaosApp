//React
import React from 'react';

//Components
import TimerBar from '../components/TimerBar.js'

// Styles
import '../App.css';

const Bridge = (props) => {
    return (
        <div className="App">
            <TimerBar timeLength="10" path="/"/><br /><br /><br /><br />
            <TimerBar timeLength="120" path="/"/>
        </div>
    )
}

export default Bridge;