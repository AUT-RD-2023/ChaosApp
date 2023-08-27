// React
import React, {useEffect, useState} from "react";

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";

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

  const nickname = useSelector((state) => state.session.nickname);
  const playerId = useSelector((state) => state.session.playerId);
  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const round = useSelector((state) => state.session.round);

  const [addLength, setAddLength] = useState(0);
  const [firstAdd, setFirstAdd] = useState(true);

  /* DATABASE */

  const responseData = ref(database, 'lobby-' + gamePin + '/responses/round-' + round + '/' + playerId);
  const [discussionTime, setDiscussionTime] = useState();

  onValue(responseData, (snapshot) => { 
    console.log(snapshot.val()); // print the response made by this player in the console
  });

  const discussionTimeData = ref(database, 'lobby-' + gamePin + '/discussionTime');

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
      />
      <div className={styles.button_spacer}/>
        <Button 
            name="ADD TIME"
            static={ false } //button width decreases as page height increases
            press={handleAddTime}
          />
    </div>);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.subheader}>
          <div className="name"><strong>{ nickname.toUpperCase() }</strong></div>
          <div className="round">ROUND { round }/5</div>
        </div>
        <TimerBar timeLength= { discussionTime } addTime={ addLength }/>
      </div>
      <div className={styles.div_spacer}/>
      <div className={styles.discussion}>
        {/*{ isHost ? buttonsJSX : null }*/}
          {buttonsJSX }
        <div className={styles.container}>
            <div className={styles.completion}>1/5</div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>
                The average paragraph is around 200 words. This can vary depending on the type of writing you're doing. For example, if you're writing a paper for school, your teacher may have a specific word count in mind. In general, though, a paragraph should be about five to seven sentences long.
            </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
