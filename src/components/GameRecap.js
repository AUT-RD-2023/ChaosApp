// React
import React, {useEffect, useState} from "react";

// Components
import Button from "../components/Button.js";
import DownloadButton from '../components/CreateDocument.js';

// Database
import { ref,  onValue } from "firebase/database";
import { database } from '../database.js';

//Redux
import { useSelector } from "react-redux";

// Styles
import style from '../styles/EndPage.module.css';

// Images
import img from '../styles/images/crown.svg';
//import icon from '../styles/images/share.svg';

export default function GameRecap() {
    const ablyUsers = useSelector((state) => state.session.ablyUsers);
    const gamePin = useSelector((state => state.session.gamePin));
    const round = useSelector((state) => state.session.round);
    const scenario = useSelector((state => state.session.scenario));

    const [responseArray, setResponseArray] = useState([]); 
    const [voteArray, setVoteArray] = useState([]);
    const [objectArray, setObjectArray] = useState([]);

    useEffect(() => {    
      let tempArray = [{}];
      for(let i = 0; i < ablyUsers.length; i++) {
        //Responses  
        const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);    
        onValue(responseData, (snapshot) => {
          setResponseArray(oldArray => [...oldArray, snapshot.val()]);
        }, {
          onlyOnce: true
        });          
        // Votes
        const voteData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/votes`);
        onValue(voteData, (snapshot) => {
          setVoteArray(oldArray => [...oldArray, snapshot.val()]);
        }, {
          onlyOnce: true
        });
      }
      //saves the values of response and vote into and object array          
      tempArray = responseArray.map((response, index) => ({
          response:response,
          votes:voteArray[index]
      }));
      //set temp array as the object array
      setObjectArray(tempArray);
      // eslint-disable-next-line
    }, []);

    console.log(objectArray);    

    const responseString = () => {
      let string = "";

      for(let i = 0; i < responseArray.length; i++) {
        string = string + " " + responseArray[i];
      }

      console.log(string);
      return string;
    }

    const date = new Date().toLocaleString() + "";

    const emailSubj = `Chaotic - ${gamePin} Game Results`
    const emailBody = (
      `Date - ${date}
      \n
      Session - ${gamePin}
      \n
      Scenario - ${scenario}
      \n
      Responses - ${responseString()}`
    )

    return (        
      <div className={style.page}>
        <div className={style.container}>       
        <div>
          <img src={img} alt="alt" className={style.image_crown}/>
          <div className={style.subtitle}>SESSION FAVOURITES</div>
        </div> 
          <div className={style.recap}>   
          </div>            
        <div className={style.buttons}>
          <Button
            name="PLAY AGAIN"
            static={ false } //button width decreases as page height increases
          />
        </div>
        <div className={style.button_small}>       
          {/* img={ icon }
              imgClass={ style.image_share }
          */}       
          <DownloadButton />
          <Button
            name="EMAIL"
            static={ false } //button width decreases as page height increases
            press={() => { window.location.href = `mailto:example@email.com?subject=${emailSubj}&body=${emailBody}`}}
          />
        </div>            
        </div>
      </div>
    )
}