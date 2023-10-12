// React
import React, { useEffect, useState } from 'react';

// Components
import TimerBar from '../components/TimerBar.js'

// Redux
import { useDispatch, useSelector } from "react-redux";

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

    const scenario = useSelector((state) => state.session.scenario);
    const openAIKey = useSelector((state) => state.session.openAIKey);

    // ChatGPT object and prompt creation
    const [prompt] = useState(`I have a workplace scenario:  "`+scenario+`" Could you add additional chaos which would further complicate the situation? Your additional 
    chaos should be related to the situation and not extremely unrealistic. It can not be longer than 20 words.`);
    const openai = new OpenAI({
        apiKey: openAIKey,
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
    switch(round) { // Round number in text form for title 
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
            let response = "";
            
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

            if(activity === "chaos") {
                generatePrompt(); // Call function if the chaos round is about to begin
            } // eslint-disable-next-line
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