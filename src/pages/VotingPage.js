// React
import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Database
import { ref, set, update, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";
import VotingCard from "../components/VotingCard.js";
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay.js'

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity } from '../Redux/sessionSlice.js';

// Styles
import styles from "../styles/VotingPage.module.css";
import "../App.css";


const VotingPage = () => {
  const navigate = useNavigate();

  /* REDUX */

  const gamePin = useSelector((state => state.session.gamePin));
  const ablyUsers = useSelector((state) => state.session.ablyUsers);
  const round = useSelector((state) => state.session.round);
  const numPlayers = useSelector((state) => state.session.ablyUsers);

  const dispatch = useDispatch();

  const [randomArray,setRandomArray] = useState([]); 

  /*const handleSkip = () => {
    channel.publish("Next Page", { text: "true" });
  }*/

  const [channel] = useChannel(gamePin + "", (message) => {
    if(message.name === "Next Page") {
      navigate("/Bridge");
    }
  });

  useEffect(() => {    
    let tempArray = [];
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };
  
    const fetchDataPromises = [];
  
    for (let i = 0; i < ablyUsers.length; i++) {
      const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);
  
      const promise = new Promise((resolve) => {
        onValue(responseData, (snapshot) => {
          resolve(snapshot.val());
        }, {
          onlyOnce: true
        });
      });
  
      fetchDataPromises.push(promise);
    }
  
    // Wait for all responses to be fetched
    Promise.all(fetchDataPromises)
      .then((data) => {
        // Now that all responses are fetched, shuffle the array
        tempArray = shuffleArray(data);
        setRandomArray(tempArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      // Reinitialise the number of votes in database
      update(ref(database, 'lobby-' + gamePin), {
          numVotes: 0
      });

      dispatch(setActivity("results")) // eslint-disable-next-line
  }, []);
  
  // DATABASE

  const [response, setResponse] = useState("");

  const castVote = () => {    
    setCardSelected(true);

    // Iterate through each player in the lobby
    for(let i = 0; i < ablyUsers.length; i++) { 
      const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);

      onValue(responseData, (snapshot) => {
        // Match the selected response with each response in the database
        if(response === snapshot.val()) { 
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
    updateDatabase();
  }

  const updateDatabase = () => {
    let num;

    const voteData = ref(database, `lobby-${gamePin}/numVotes`); 

    onValue(voteData, (snapshot) => {
        num = snapshot.val() + 1;              

        update(ref(database, 'lobby-' + gamePin), {
            numVotes: num
        });            
    
        if(num === numPlayers.length) {            
            channel.publish("Next Page", { text: "true" })
        }
    }, {
        onlyOnce: true
    });
}

  /* PREVENT BACK */

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
    });
  }, []);  

  /* RENDER */

  // Card display style
  const [isWindowLandscape, setIsWindowLandscape] = useState(window.innerHeight < window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setIsWindowLandscape(window.innerHeight < window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

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

  const [cardSelected, setCardSelected] = useState(false);
  const [cardIndex, setCardIndex] = useState(-1);

  const onSelect = (response, index) => {
    setCardIndex(index);
    setResponse(response)
  }

  // eslint-disable-next-line
  const portrait = (
    <div className={styles.carousel_wrapper}>
        {randomArray.length === 0 ?
            (<div className={styles.no_response}>
                No responses...
            </div>)
            :
            (randomArray.map((response, index) => {
                    if(response) {
                        return (
                            <VotingCard
                                response={response}
                                key={index}
                                focusable={!buttonDisabled}
                                selected={(cardSelected) && (index === cardIndex)}
                                onFocus={() => onSelect(response, index)}
                            />)
                    } else {
                        return null;
                    }
                })
            )}
    </div>
    );
  
    const landscape = (
        <div className={ styles.masonry }>
            {randomArray.length === 0 ?
                (<div className={styles.no_response}>
                    No responses...
                </div>)
                :
                (randomArray.map((response, index) => {
                        if(response) {
                            return (
                                <VotingCard
                                    response={response}
                                    key={index}
                                    focusable={!buttonDisabled}
                                    selected={(cardSelected) && (index === cardIndex)}
                                    onFocus={() => onSelect(response, index)}
                                />)
                        } else {
                            return null;
                        }
                    })
                )}
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
              { buttonsJSX }
              <div className={styles.container}>
                  <div className={styles.subtitle}>TAKE A VOTE</div>
                  { isWindowLandscape ? landscape : portrait }
              </div>
          </div>
      </div>
    );
}



export default VotingPage;
