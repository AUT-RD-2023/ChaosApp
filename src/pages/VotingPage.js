/*
* VotingPage.js
* Author: Jade Thompson-Tavai
* Date: 24-08-23
*
* Contributors:
*
*
*/

// React
import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import VotingCard from "../components/VotingCard.js";
import Header from '../components/Header.js'

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setRound } from '../Redux/sessionSlice.js';

// Styles
import styles from "../styles/VotingPage.module.css";

import "../App.css";


const VotingPage = () => {
  const navigate = useNavigate();

  /* REDUX */

  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const ablyUsers = useSelector((state) => state.session.ablyUsers);

  const round = useSelector((state) => state.session.round);
  const numRounds = useSelector((state) => state.session.numRounds);  

  const dispatch = useDispatch();

  const [responseArray, setResponseArray] = useState([]); 

  const handleSkip = () => {
    channel.publish("Next Page", { text: "true" });
  }

  const [channel] = useChannel(gamePin + "", (message) => {
    if(message.name === "Next Page") {      
      // Set up for the next round
      if(round < numRounds) {
        dispatch(setActivity("chaos"));  
        dispatch(setRound(round + 1));
      } else {
        dispatch(setActivity("end")); 
      }
      navigate("/Bridge");
    }
  });

  useEffect(() => {    
    for(let i = 0; i < ablyUsers.length; i++) {
      const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);

      onValue(responseData, (snapshot) => {
        setResponseArray(oldArray => [...oldArray, snapshot.val()]);
      }, {
        onlyOnce: true
      });  
    } // eslint-disable-next-line
  }, []);

  const buttonsJSX = (
    <div className={styles.buttons}>
      <Button
          name="VOTE"
          static={ false } //button width decreases as page height increases
      />
    </div>);

const hostButtonsJSX = (
  <div className={styles.buttons}>
    <Button
        name="VOTE"
        static={ false } //button width decreases as page height increases
    />
    <div className={styles.button_spacer}/>
      <Button 
          name="SKIP"
          static={ false } //button width decreases as page height increases         
          press={ handleSkip }
        />
  </div>);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
          <div className={styles.subheader}>
              <Header />
          </div>
          <TimerBar />
      </div>
      <div className={styles.container}>
          <div className={styles.subtitle}>TAKE A VOTE</div>
      </div>
      {/* container for response cards*/}
      <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
              {
                responseArray.map(response =>
                  <VotingCard response = {response}/>)
              }
          </div>
      </div>
      { isHost ? hostButtonsJSX : buttonsJSX }
    </div>
  )
}



export default VotingPage;