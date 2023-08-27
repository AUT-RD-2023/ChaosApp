// React
import React, { useEffect, useState } from "react";
import { useChannel, usePresence } from "@ably-labs/react-hooks";

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import Header from "../components/Header.js"

// Variables
import { useSelector } from "react-redux";

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Styles
import styles from "../styles/DiscussionPage.module.css";
import "../App.css";

function DiscussionPage() {
  /* REDUX */

  const playerId = useSelector((state) => state.session.playerId);
  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const round = useSelector((state) => state.session.round);

  const [addLength, setAddLength] = useState(0);
  const [firstAdd, setFirstAdd] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* DATABASE */

  const discussionTimeData = ref(database, 'lobby-' + gamePin + '/discussionTime');
  const [discussionTime, setDiscussionTime] = useState();  

  useEffect(() => {
    onValue(discussionTimeData, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDiscussionTime(data);
      }
    });
  }, [discussionTimeData]);

  function handleAddTime() {    
    if(firstAdd === true) {
      setAddLength(addLength + 5);
      setFirstAdd(false);
    } else {
      setAddLength(addLength + 0.001);
    }
  }

  const nextResponse = () => {
    if(currentIndex < finalArray.length-1) {
      setCurrentIndex(currentIndex + 1);
      console.log("gogo");
    }
    else {
      setCurrentIndex(0);
      console.log("reset");
    }
  }

  /* ABLY */

  const [responseArray, setResponseArray] = useState([]);
  const [finalArray, setFinalArray] = useState([]);

  const [presenceUsers] = usePresence(gamePin + ""); 

  const [channel] = useChannel(gamePin + "", (message) => {
    if(message.name === "Add to Array") {
      console.log("message recieved: " + message.data.text);
      setResponseArray(oldArray => [...oldArray, message.data.text]);
    }
  });  
  
  useEffect(() => {
    const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${playerId}/response`);

    onValue(responseData, (snapshot) => {
      channel.publish("Add to Array", { text: snapshot.val() });
    });       
    setFinalArray(Array.from(new Set(responseArray)));  
    // eslint-disable-next-line
  }, [presenceUsers]);    

  console.log(finalArray);

  /* RENDER */

  const buttonsJSX = (
    <div className={styles.buttons}>
      <Button
          name="NEXT"
          static={ false } //button width decreases as page height increases
          press={ nextResponse }
      />
      <div className={styles.button_spacer}/>
        <Button 
            name="ADD TIME"
            static={ false } //button width decreases as page height increases
            press={ handleAddTime }
          />
    </div>);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.subheader}>
          <Header />
        </div>
        <TimerBar timeLength= { discussionTime } addTime={ addLength }/>
      </div>
      <div className={styles.div_spacer}/>
      <div className={styles.discussion}>
        { isHost ? buttonsJSX : null }
        { /* buttonsJSX */ }
        <div className={styles.container}>
            <div className={styles.completion}>1/5</div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>{ finalArray[currentIndex] }</div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
