// React
import React from 'react';

// Components
import TimerBar from '../components/TimerBar.js'

// Redux
import { useSelector } from "react-redux";

// Styles
import '../App.css';

const Bridge = () => {

    const round = useSelector((state) => state.session.round);
    const activity = useSelector((state) => state.session.activity);

    let roundText
    let subheading;
    let path;

    switch(activity) {
        case "start":
            subheading = "Get Ready...";
            path = "/Scenario";
            //path = "/Message";
            break;
        case "discussion":
            subheading = "Discussion Time...";
            path = "/Discussion";
            break;
        case "voting":
            subheading = "Vote For Your Favourite...";
            path = "/Voting";
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
    switch(round) {
        case 1:
            roundText = "ONE";
            break;
        case 2:
            roundText = "TWO";
            break;
        case 3:
            roundText = "THREE";
            break;
        case 4:
            roundText = "FOUR";
            break;
        case 5:
            roundText = "FIVE";
            break;
    }

    return (
        <div className="App">
            <div className="heading">ROUND {roundText}</div><br />
            <div className="subheading">{subheading}</div><br />
            <TimerBar timeLength="5" addTime="0" path={path} />
        </div>
    )
}

export default Bridge;