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
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay.js'

//variables
import { useSelector } from "react-redux";

// Styles
import styles from "../styles/VotingPage.module.css";
import "../App.css";
import style from "../styles/LobbyPage.module.css";
import Textarea from "../components/Textarea";


const VotingPage = () => {
    /* REDUX */
    //const nickname = useSelector((state) => state.session.nickname);
    const isHost = useSelector((state => state.session.isHost));
    const round = useSelector((state) => state.session.round);
    const gamePin = useSelector((state => state.session.gamePin));
    const ablyUsers = useSelector((state) => state.session.ablyUsers);


    const [responseArray, setResponseArray] = useState([]);

    useEffect(() => {
        for(let i = 0; i < ablyUsers.length; i++) {
            const responseData = ref(database, `lobby-${gamePin}/responses/round-${round}/${ablyUsers[i]}/response`);

            onValue(responseData, (snapshot) => {
                if (snapshot.val() !== null) {
                    setResponseArray(oldArray => [...oldArray, snapshot.val()]);
                    console.log("Added response from User: " + ablyUsers[i] + ", Response: " + snapshot.val());
                }
            }, {
                onlyOnce: true
            });
        }

        // eslint-disable-next-line
    }, []);

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
                <TimerBar timeLength= {2000} addTime="0" path="/Bridge" />
                <HowToPlay/>
            </div>
            <div className={styles.content}>
            <div className={styles.buttons}>
                <Button
                    name= "VOTE"
                    static={ false }/>
            </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>TAKE A VOTE</div>
                    { landscape }
                </div>
            </div>
        </div>
    );
}



export default VotingPage;