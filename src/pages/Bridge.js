//React
import React from 'react';
import { useLocation } from 'react-router-dom';

//Components
import TimerBar from '../components/TimerBar.js'

// Styles
import '../App.css';

const Bridge = () => {
    const location = useLocation();
    const { state } = location;

    let round;
    let subheading;
    let path;

    switch(state.activity) {
        case "start":
            subheading = "Get Ready...";
            path = "/Scenariopage";
            //path = "/Message";
            break;
        case "discussion":
            subheading = "Discussion Time...";
            path = "/";
            break;
        case "chaos":
            subheading = "Adding Chaos...";
            // path = "/chaos";
            break;
        default:
            subheading = "Get Ready...";
            path = "/";
            break;
    }

    // eslint-disable-next-line default-case
    switch(state.round) {
        case 1:
            round = "ONE";
            break;
        case 2:
            round = "TWO";
            break;
        case 3:
            round = "THREE";
            break;
        case 4:
            round = "FOUR";
            break;
        case 5:
            round = "FIVE";
            break;
    }

    return (
        <div className="App">
            <div className="heading">ROUND {round}</div><br />
            <div className="subheading">{subheading}</div><br />
            <TimerBar timeLength="5" path={path} state={state ? state : null}/>
        </div>
    )
}

export default Bridge;