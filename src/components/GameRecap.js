// React
import React, {useEffect, useState} from "react";

// Components
import Button from "../components/Button.js";

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
                <Button
                    /*img={ icon }
                    imgClass={ style.image_share }*/
                    name="SHARE"
                    static={ false } //button width decreases as page height increases
                />
                <div className={style.button_spacer} />
                <Button
                    name="QUIT"
                    static={ false } //button width decreases as page height increases
                />
            </div>
                
            </div>
        </div>
    )
}