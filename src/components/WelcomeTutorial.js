// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

function WelcomeTutorial(){
    return(
            <div className={style.page}>
                <div className={style.welcome}>
                    <div>
                        <p className={style.title}>WELCOME</p>
                        <p className={style.text}>
                            <br />
                            While playing Chaotic, you will take part in exploring different scenarios that lead to health and safety incidents.
                            You and your team will brainstorm responses and devise plans to respond to the situation as scenarios get more and more chaotic!
                            <br /><br />
                            <strong>This isn’t a test of your health and safety knowledge</strong>, but rather a discussion about what can go wrong, and how we can work on
                            creating better outcomes together.
                        </p>
                    </div>
                </div>
            </div>
    )
}

export default WelcomeTutorial;