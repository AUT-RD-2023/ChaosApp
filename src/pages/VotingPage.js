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

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import VotingCard from "../components/VotingCard.js";

//variables
import { useSelector } from "react-redux";

// Styles
import styles from "../styles/VotingPage.module.css";

import "../App.css";


const VotingPage = () => {
    /* REDUX */
    const nickname = useSelector((state) => state.session.nickname);
    const isHost = useSelector((state => state.session.isHost));
    const round = useSelector((state) => state.session.round);
    const gamePin = useSelector((state => state.session.gamePin));
  const ablyUsers = useSelector((state) => state.session.ablyUsers);


    const [responseArray, setResponseArray] = useState([]); 

    useEffect(() => {
        if(isHost) {
          for(let i = 0; i < ablyUsers.length; i++) {
            const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);
    
            onValue(responseData, (snapshot) => {
              setResponseArray(oldArray => [...oldArray, snapshot.val()]);
              //console.log("Added response from User: " + ablyUsers[i] + ", Response: " + snapshot.val());
            }, {
              onlyOnce: true
            });  
          }      
        }
        // eslint-disable-next-line
      }, []);
     /* DATABASE */ 
     
     //Get players response and print to response card.
    //Retrieve responses + playerID of response to award points.
    
    //place response + playerID in a map?Array?
    //for each response call a card constructorj and pass response+playerID

    //placeholders
    const name = "Name".toUpperCase();
    const votes = "1/8 voted".toUpperCase();

    const buttonsJSX = (
        <div className={styles.buttons}>
          <Button
              name="VOTE"
              static={ false } //button width decreases as page height increases
          />
          <div className={styles.button_spacer}/>
            <Button 
                name="SKIP"
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
          />
    </div>);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <div className="name">{name}</div>
                    <div className="round">{votes}</div>
                </div>
                <TimerBar />
            </div>
            <div className={styles.container}>
                <div className={styles.subtitle}>TAKE A VOTE</div>
            </div>

        {/* container for response cards*/}
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {/* Needs to be optimised for functionality - currently placeholders */}
                <div className={styles.card} tabIndex={0}> The average paragraph is around 200 words. This can vary depending on the type of writing you're doing. For example, if you're writing a paper for school, your teacher may have a specific word count in mind. In general, though, a paragraph should be about five to seven sentences long.</div>
                <div className={styles.card} tabIndex={0}>Response 2</div>
                <div className={styles.card} tabIndex={0}>Response 3</div>
                <div className={styles.card} tabIndex={0}>Response 4</div>
                <div className={styles.card} tabIndex={0}>Response 5</div>
                <div className={styles.card} tabIndex={0}>Response 6</div>
                <div className={styles.card} tabIndex={0}>Response 7</div>
                <div className={styles.card} tabIndex={0}>Response 8</div>
            </div>
        </div>
         { isHost ? hostButtonsJSX : buttonsJSX }
        </div>
    )
}



export default VotingPage;