// React
import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import Header from "../components/Header.js"

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity } from '../Redux/sessionSlice.js';

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Styles
import styles from "../styles/DiscussionPage.module.css";
import "../App.css";

function DiscussionPage() {
  const navigate = useNavigate();
  
  const [responseArray, setResponseArray] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  const [discussionText, setDiscussionText] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [maxText, setMaxText] = useState("");

  /* REDUX */

  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const round = useSelector((state) => state.session.round);
  const ablyUsers = useSelector((state) => state.session.ablyUsers);

  const dispatch = useDispatch();

  /* REACT HOOKS */

  useEffect(() => {
    if(isHost) {
      for(let i = 0; i < ablyUsers.length; i++) {
        const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);

        onValue(responseData, (snapshot) => {
          if(snapshot.val() != null) {
            setResponseArray(oldArray => [...oldArray, snapshot.val()]);
          }
        }, {
          onlyOnce: true
        });  
      }     
    }     
    // Set up next activity for all players
    dispatch(setActivity("voting")); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(isHost) { 
      channel.publish("Set Text", { text: responseArray[0] });
      channel.publish("Set Current", { text: currentIndex + 1 });
      channel.publish("Set Max", { text: responseArray.length });
    } // eslint-disable-next-line
  }, [responseArray]);

  useEffect(() => {
    if(isHost) {
      channel.publish("Set Text", { text: responseArray[currentIndex] });
      channel.publish("Set Current", { text: currentIndex + 1 });
    } // eslint-disable-next-line
  }, [currentIndex]);

  /* BUTTONS */

  const nextResponse = () => {
    if(currentIndex < responseArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setButtonDisabled(false);
    } else {
      channel.publish("Next Page", { text: "true" });
    }
  }

  // Reset current time when the NEXT button is pressed
  const [resetCount, setResetCount] = useState(1);  

  const resetTime = () => {
    // Only reset the time if not currently on the final response 
    if(resetCount < responseArray.length ) { 
      // Iterate the count variable to match the current response being displayed
      channel.publish("Reset Time", { number: resetCount + 1 });
    }
  }  
  
  const [buttonDisabled, setButtonDisabled] = useState(false); 
  const [addTime, setAddTime] = useState(0);
  const addLength = 30;

  function handleAddTime() {
    channel.publish("Add Time", { number: addLength });
    setButtonDisabled(true);
  }
  
  /* ABLY */

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
    if (message.name === "Add Time") {
      setAddTime(message.data.number);
    }
    if (message.name === "Reset Time") {
      setResetCount(message.data.number);      
      // Reset add time when the "NEXT" button is pressed
      setAddTime(0);
    }    
    if (message.name === "Next Page") {
      navigate("/Bridge");
    }
  });    

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

  /* RENDER */

  const buttonsJSX = (
    <div className={styles.buttons}>
      <Button
          name={ currentIndex + 1 === responseArray.length ? "SKIP" : "NEXT" }
          static={ false } //button width decreases as page height increases
          press={ () => {
            nextResponse();
            resetTime();
          }}
      />
      <div className={styles.button_spacer}/>
        <Button 
            name="ADD TIME"
            static={ false } //button width decreases as page height increases
            press={ handleAddTime }
            disabled={ buttonDisabled } 
          />
    </div>);
    
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.subheader}>
          <Header />
        </div>
        <TimerBar timeLength= { discussionTime } addTime={ addTime } resetTime={ resetCount } />
      </div>
      <div className={styles.div_spacer}/>
      <div className={styles.discussion}>
        { isHost ? buttonsJSX : null }
        <div className={styles.container}>
            <div className={styles.completion}>{`${currentText}/${maxText}`}
            </div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>{ discussionText }</div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
