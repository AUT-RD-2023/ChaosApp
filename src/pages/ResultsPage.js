// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import VotingCard from "../components/VotingCard.js";
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay.js'

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setRound } from '../Redux/sessionSlice.js';

// Styles
import styles from "../styles/VotingPage.module.css";
import "../App.css";

export default function ResultsPage() {
    const navigate = useNavigate();

    /* REDUX */

    const gamePin = useSelector((state => state.session.gamePin));
    const isHost = useSelector((state => state.session.isHost));
    const ablyUsers = useSelector((state) => state.session.ablyUsers);

    const round = useSelector((state) => state.session.round);
    const numRounds = useSelector((state) => state.session.numRounds);  

    const dispatch = useDispatch();

    const [responseArray, setResponseArray] = useState([]); 
    const [voteArray, setVoteArray] = useState([]); 
    const [objectArray, setObjectArray] = useState([{}]);

    useEffect(() => {    
        const fetchDataPromises = [];
    
        for(let i = 0; i < ablyUsers.length; i++) {
            // Response
            const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);
    
            const responsePromise = new Promise((resolve) => {
                onValue(responseData, (snapshot) => {
                    setResponseArray(oldArray =>[...oldArray, snapshot.val()]);
                    resolve(snapshot.val());
                }, {
                    onlyOnce: true
                });
            });
    
            // Votes
            const voteData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/votes`);
    
            const votePromise = new Promise((resolve) => {
                onValue(voteData, (snapshot) => {
                    setVoteArray(oldArray =>[...oldArray, snapshot.val()]);
                    resolve(snapshot.val());
                }, {
                    onlyOnce: true
                });
            });
            //push promises to the fetchDataPromises Array
            fetchDataPromises.push(responsePromise, votePromise);
        }
    
        // Wait for all response and vote promises to resolve
        Promise.all(fetchDataPromises)
            .then((data) => {
                // tempArray to store data
                const tempArray = [];
    
                for (let i = 0; i < data.length; i += 2) {
                    const responseValue = data[i];
                    const voteValue = data[i + 1];
    
                    tempArray.push({
                        response: responseValue,
                        votes: voteValue
                    });
                }
                // Set tempArray as the objectArray
                setObjectArray(tempArray);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        // Set up next activity for all players
        if (round < numRounds) {
            dispatch(setActivity("chaos"));  
            dispatch(setRound(round + 1));
        } else {
            dispatch(setActivity("end")); 
        }
        // eslint-disable-next-line
    }, []);
    console.log(objectArray);

    const handleSkip = () => {
        channel.publish("Next Page", { text: "true" });
    }
    
    const [channel] = useChannel(gamePin + "", (message) => {
        if(message.name === "Next Page") {
            navigate("/Bridge");
        }
    });

    /* PREVENT BACK */

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);

        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, []);

    // RENDER

    const hostButtonsJSX = (
        <div className={styles.buttons}>
            <Button 
                name="SKIP"
                static={ false } //button width decreases as page height increases         
                press={ handleSkip }
              />
        </div>);        

    // eslint-disable-next-line
    const portrait = (
        <div className={styles.carousel_wrapper}>
            {responseArray.length === 0 ? 
              (<div className={styles.no_response}>
                    No responses...
              </div>)
              : 
              responseArray.map((response, index) => 
              <VotingCard response={ response } votes={
                voteArray[index] > 0 ? voteArray[index] === 1 ? voteArray[index] + " Vote" : voteArray[index] + " Votes" : ""
              }/>
            )}
        </div>
    );

    const landscape = (
      <div className={ styles.masonry }>
        {responseArray.length === 0 ? 
          (<div className={styles.no_response}>
                No responses...
            </div>)
            : 
            responseArray.map((response, index) => 
            <VotingCard response={ response } votes={
                voteArray[index] > 0 ? voteArray[index] === 1 ? voteArray[index] + " Vote" : voteArray[index] + " Votes" : ""
            }/>)}
      </div>
    );

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <Header />
                </div>
                <TimerBar timeLength= { 30 } path="/Bridge" />
                <HowToPlay/>
            </div>
            <div className={styles.content}>            
            { isHost ? hostButtonsJSX : null }
                <div className={styles.container}>
                    <div className={styles.subtitle}>VOTING RESULTS</div>
                    { landscape }
                </div>
            </div>
        </div>
    );
}

