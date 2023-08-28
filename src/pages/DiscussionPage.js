// React
import React, { useEffect, useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";

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

  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const round = useSelector((state) => state.session.round);

  const ablyUsers = useSelector((state) => state.session.ablyUsers);
  const [responseArray, setResponseArray] = useState([]); 

  const [discussionText, setDiscussionText] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [maxText, setMaxText] = useState("");

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

  const nextResponse = () => {
    if(currentIndex < responseArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else {
      setCurrentIndex(0);
    }
    channel.publish("Set Text", { text: responseArray[currentIndex] });
    channel.publish("Set Current", { text: currentIndex + 1 });
    channel.publish("Set Max", { text: responseArray.length });
  }

  const [channel] = useChannel(gamePin + "", (message) => {
    if(message.name === "Set Text") {      
      setDiscussionText(message.data.text);
    }
    if(message.name === "Set Current") {      
      setCurrentText(message.data.text);
    }
    if(message.name === "Set Max") {      
      setMaxText(message.data.text);
    }
    //console.log(`Message recieved, Name: ${message.name} | Data: ${message.data.text}`);
  });    

  useEffect(() => {
    channel.publish("Set Text", { text: responseArray[0] });
    nextResponse();
    // eslint-disable-next-line
  }, [channel, responseArray]);

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
        <div className={styles.container}>
            <div className={styles.completion}>{ currentText }/{ maxText }</div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>{ discussionText }</div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
