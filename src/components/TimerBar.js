// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from '../styles/Timer.module.css';

const TimerBar = (props) => {
    const navigate = useNavigate();
    const path = props.path;
    //const round = props.rounds;

    const timerStart = props.timeLength * 1000; // Countdown start time
    const [time, setTime] = useState(props.timeLength * 1000); // Dynamic counting-down time
    const [referenceTime, setReferenceTime] = useState(Date.now()); // Reference time fixes the slight inaccuracies of setTimeout intervals.

    // Countdown //

    useEffect(() => {
            const countDown = () => {
                setTime(prevTime => {
                    if(prevTime <= 0) {
                        setTimeout(() => {
                            navigate(path);
                        }, 100);
                        
                        return 0;
                    }

                    const now = Date.now();
                    const interval =  now - referenceTime;
                    setReferenceTime(now);
                    return prevTime - interval;
                });
            }
            setTimeout(countDown, 1); // One millisecond intervals to make it look smooth
    }, [time, path, referenceTime, navigate]);    

    const calculateWidth = () => {
        const remainingPercentage = (time / timerStart) * 100;
        const widthPercentage = remainingPercentage + 0.8; // Start at 0vw and end at 101vw
        return widthPercentage === 0.8 ? 0 : widthPercentage; // Ensure width doesn't exceed 100vw
    };


    // Add time button functionality //

    useEffect(() => {
        setTime(prevTime => {
            const newTime = prevTime + (props.addTime * 1000);
            // Ensure the new time does not exceed the original timerStart time
            return newTime <= timerStart ? newTime : timerStart;
        }); // eslint-disable-next-line
    }, [props.addTime, timerStart]);

    // Reset time function

    useEffect(() => {
        setTime(timerStart); // eslint-disable-next-line
    }, [props.resetTime]);
    

    return (
        <span style={{overflow: 'hidden'}}>
            <div className={styles.timer_base}>
                <div className={styles.timer} style={{ width: `${calculateWidth()}vw`}}></div>
            </div>
        </span>
    );
}

export default TimerBar;

