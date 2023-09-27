// React
import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Database
import { ref, set, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import VotingCard from "../components/VotingCard.js";
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay.js'

// Redux
import { useSelector } from "react-redux";

// Styles
import styles from "../styles/VotingPage.module.css";
import "../App.css";

function VotingPage() {
  const navigate = useNavigate();

  /* REDUX */

  const gamePin = useSelector((state => state.session.gamePin));
  const isHost = useSelector((state => state.session.isHost));
  const ablyUsers = useSelector((state) => state.session.ablyUsers);
  const round = useSelector((state) => state.session.round);

  const [responseArray, setResponseArray] = useState([]); 

  const handleSkip = () => {
    channel.publish("Next Page", { text: "true" });
  }

  const [channel] = useChannel(gamePin + "", (message) => {
    if(message.name === "Next Page") {
      navigate("/Results");
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

  // DATABASE

  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log(response);
  }, [response]);  

  const castVote = () => {
    // Iterate through each player in the lobby
    for(let i = 0; i < ablyUsers.length; i++) { 
      const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);

      onValue(responseData, (snapshot) => {
        // Match the selected response with each response in the database
        if(response === snapshot.val()) { 
          console.log(`A vote has been cast for ${ablyUsers[i]}'s response!`);

          let votes = 1;

          // Get the current number of votes  
          const voteData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/votes`); 

          onValue(voteData, (snapshot) => {
            if(snapshot.exists()) {
              // set the votes variable to one more than the current amount
              votes = snapshot.val() + 1; 
            }
          });

          // Set the number of votes for that response to the new votes value
          set(ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/`), { 
            response: response,
            votes: votes
          }); 
        }
      }, {
        onlyOnce: true
      });  
    }
    setButtonDisabled(true);
  }

  /* PREVENT BACK */

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  // RENDER

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const buttonsJSX = (
    <div className={styles.buttons}>
      <Button
          name={ buttonDisabled ? "✓" : "VOTE" }
          static={ false }          
          disabled={ buttonDisabled }
          press={ castVote }
      />
    </div>);

const hostButtonsJSX = (
  <div className={styles.buttons}>
    <Button
        name={ buttonDisabled ? "✓" : "VOTE" }
        static={ false } 
        disabled={ buttonDisabled }
        press={ castVote }
    />
    <div className={styles.button_spacer}/>
      <Button 
          name="SKIP"
          static={ false } 
          press={ handleSkip }
        />
    </div>);

    const portrait = (
        <div className={styles.carousel_wrapper}>
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="jgd;alsgjkldasgh;ldkasgjl;k adsjg;lkas adgjla;jgldsjglksdjgklasd;j g jdilagj;ladsjgl;dasjglas jgdklgja;sdljgklasjgldksa adjgkla;jsgldsjglksdj jdgl;asdjlgjsaldjg djkgla;jsdgjldaskjgalks jdgkaslj;gdlsjglakdsjg" />
            {/*{responseArray.length === 0 ? (*/}
            {/*    <div className={styles.no_response}>*/}
            {/*        No responses :(*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    responseArray.map((response, index) => (*/}
            {/*        <VotingCard response={response} key={index} />*/}
            {/*    ))*/}
            {/*)}*/}
        </div>
    );

    const landscape = (
        <div className={ styles.masonry }>
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="jgd;alsgjkldasgh;ldkasgjl;k adsjg;lkas adgjla;jgldsjglksdjgklasd;j g jdilagj;ladsjgl;dasjglas jgdklgja;sdljgklasjgldksa adjgkla;jsgldsjglksdj jdgl;asdjlgjsaldjg djkgla;jsdgjldaskjgalks jdgkaslj;gdlsjglakdsjg" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
            <VotingCard response="This is my reponse" />
        </div>
    );

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <Header />
                </div>
                <TimerBar timeLength= {5000} path="/Results" />
                <HowToPlay/>
            </div>
            <div className={styles.content}>            
            { isHost ? hostButtonsJSX : buttonsJSX }
                <div className={styles.container}>
                    <div className={styles.subtitle}>TAKE A VOTE</div>
                    { landscape }
                </div>
            </div>
        </div>
    );
}

export default VotingPage;