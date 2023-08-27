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
import React from "react";

// Database
import { ref, set } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";

// Styles
// import styles from "../styles/DiscussionPage.module.css";
import styles from "../styles/VotingPage.module.css";

import "../App.css";


const VotingPage = () => {

    const name = "Name".toUpperCase();


    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <div className="name">{name}</div>
                    <div className="round">1/8 VOTED</div>
                </div>
                <TimerBar />
            </div>
            <div className={styles.container}>
                <div className={styles.subtitle}>TAKE A VOTE</div>
            </div>
        {/* Container for response cards */}
        
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {/* Needs to be optimised for functionality - currently placeholders */}
                <div className={styles.card} tabindex={0}> The average paragraph is around 200 words. This can vary depending on the type of writing you're doing. For example, if you're writing a paper for school, your teacher may have a specific word count in mind. In general, though, a paragraph should be about five to seven sentences long.
            </div>
                <div className={styles.card} tabindex={0}>Response 2</div>
                <div className={styles.card} tabindex={0}>Response 3</div>
                <div className={styles.card} tabindex={0}>Response 4</div>
                <div className={styles.card} tabindex={0}>Response 5</div>
                <div className={styles.card} tabindex={0}>Response 6</div>
                <div className={styles.card} tabindex={0}>Response 7</div>
                <div className={styles.card} tabindex={0}>Response 8</div>
            </div>
        </div>
        <div className={styles.buttons}>
            <Button name="VOTE" 
            static={false} 
            />
        </div>

        </div>
    )
}



export default VotingPage;