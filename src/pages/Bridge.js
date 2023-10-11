// React
import React, { useEffect, useState } from 'react';

// Components
import TimerBar from '../components/TimerBar.js'

// Redux
import {useDispatch, useSelector} from "react-redux";

//ChatGPT
import { OpenAI } from 'openai';

// Styles
import '../App.css';
import style from '../styles/Bridge.module.css';
import { setChaos } from "../Redux/sessionSlice";

const Bridge = () => {
    const dispatch = useDispatch();

    //Retrieving round and identifying the next page from redux store
    const round = useSelector((state) => state.session.round);
    const activity = useSelector((state) => state.session.activity);

    // ChatGPT object and prompt creation
    let response = "";
    const [prompt] = useState('I have a workplace scenario of a potential hazard. Can you come up with an additional factor which further complicates the situation.');
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_CHATGPT_API, // Needs new API key because OpenAI killed last one for being "leaked" when gh pages deployed it
        dangerouslyAllowBrowser: true
    });

    let roundText
    let subheading;
    let path;

    // Determine which subheading and path is used, depending on what the next activity is
    switch(activity) {
        case "start":
            subheading = "Get Ready...";
            path = "/Scenario";
            break;
        case "discussion":
            subheading = "Discussion Time...";
            path = "/Discussion";
            break;
        case "voting":
            subheading = "Let's Take a Vote...";
            path = "/Voting";
            break;
        case "results":
            subheading = "Tallying Votes...";
            path = "/Results";
            break;
        case "chaos":
            subheading = "Adding Chaos...";
            path = "/Chaos";
            break;
        case "end":
            subheading = "Finalising Results...";
            path = "/End";
            break;
        default:
            subheading = "Get Ready...";
            path = "/";
            break;
    }

    // eslint-disable-next-line default-case
    // Round number in text form for title
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

    /* PREVENT BACK */
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, []);

    /* CHAT GPT CHAOS GENERATION */
        useEffect(() => {
            async function generatePrompt() { // Generate a response from ChatGPT
                try {
                     response = await openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        max_tokens: 20, // Length of response, try not to change because it will break CSS on Chaos Page
                        messages: [{
                            role: "system",
                            content: prompt
                        }]
                    });

                    dispatch(setChaos(response.choices[0].message.content)); // Store returned response in redux store

                } catch (error) {
                    console.log("Error generating response:", error);
                }
            }

            if(activity === "chaos")
                generatePrompt(); // Call function if the chaos round is about to begin
        }, [prompt]);

    return (
        <div className="App">
            <div className={style.heading}>ROUND {roundText}</div><br />
            <div className={style.subheading}>{subheading}</div><br />
            <TimerBar timeLength="10" addTime="0" path={path} />
        </div>
    );
}

export default Bridge;