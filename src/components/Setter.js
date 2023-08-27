import style from '../styles/SlideSettings.module.scss';
import Input from './Input.js';
import {useEffect, useState} from "react";

function Setter(props) {
    let inputStyle = null;
    const [value, setValue] = useState(props.reset);

    useEffect(() => {

        if(props.id === "rounds") setValue(rounds)  // This would need to become whatever value is in the database
        else if(props.id === "response") setValue(formatTime(responseTime))
        else if(props.id === "discussion") setValue(formatTime(discussionTime));
    }, [setValue, responseTime, rounds, discussionTime, props.id]);


    const orientation = props.orientation;

    if(orientation === "portrait"){
        inputStyle = {
            height: "13vw",
            maxHeight: "10vh",
            fontSize: "min(5.5vw, 4.5vh)",
            width: "min(28vw, 23vh)"
        };
    } else if (orientation === "landscape") {
        inputStyle = {
            width: "7vw",
            height: "3.5vw",
            fontSize: "1.5vw"
        };
    }

    function increaseNum() {
        if(props.id === "rounds") {
            if (value < 8) {
                setValue(value + 1);
            }
        } else {
            const newTime = addSeconds(value, 30);
            if (newTime <= "10:00") {
                setValue(newTime);
            }
        }
    }

    function decreaseNum() {
        if(props.id === "rounds") {
            if (value > 1) {
                setValue(value - 1);
            }
        } else {
            const newTime = subtractSeconds(value, 30);
            if (newTime >= "01:00") {
                setValue(newTime);
            }
        }
    }

    const addSeconds = (time, seconds) => {
        const [minutes, oldSeconds] = time.split(':').map(Number);
        const newSeconds = (oldSeconds + seconds) % 60;
        const newMinutes = minutes + Math.floor((oldSeconds + seconds) / 60);

        if(((newMinutes * 60) + newSeconds) <= 600 ){
            setIntValue((newMinutes * 60) + newSeconds);
            return `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        }
    };

    const subtractSeconds = (time, seconds) => {
        const [minutes, oldSeconds] = time.split(':').map(Number);
        const remainingSeconds = minutes * 60 + oldSeconds - seconds;
        const newMinutes = Math.floor(remainingSeconds / 60);
        const newSeconds = remainingSeconds % 60;

        if(((newMinutes * 60) + newSeconds) >= 60) {
            setIntValue((newMinutes * 60) + newSeconds);
            return `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        }
    };

    useEffect(() => {
        if(props.savePressed) {
            if(props.id === "rounds") { // Save rounds value in database
                if(value === 0) {
                    update(ref(database, 'lobby-' + gamePin), {
                        numRounds: 2
                    });
                } else {
                    update(ref(database, 'lobby-' + gamePin), {
                        numRounds: value
                    });
                }
            } else if(props.id === "response") { // Save response time in database
                if(intValue === 0) {
                    update(ref(database, 'lobby-' + gamePin), {
                        responseTime: 60
                    });
                } else {
                    update(ref(database, 'lobby-' + gamePin), {
                        responseTime: intValue
                    });
                }
            } else if(props.id === "discussion") { // Save discussion time in database
                if(intValue === 0) {
                    update(ref(database, 'lobby-' + gamePin), {
                        discussionTime: 120
                    });
                } else {
                    update(ref(database, 'lobby-' + gamePin), {
                        discussionTime: intValue
                    });
                }
            }
        }
    }, [props.savePressed]);

    return (
        <div className={style.setter}>
            <button name="-" className={style.decrease_button} onClick={() =>decreaseNum()} >- </button>
            <Input
                    style={ inputStyle }
                    placeholder={ value }
                    maxLength={5}
                    readOnly={true}
                />
            <button className={style.increase_button} onClick={() =>
                increaseNum()}>+</button>
        </div>
    )
}

export default Setter