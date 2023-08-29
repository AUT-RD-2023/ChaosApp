// React
import React, {useState, useRef} from 'react';

// Style
import styles from '../styles/CustomPopUp.module.css';

// Components
import Button from "../components/Button.js";
import Textarea from "../components/Textarea.js";
import { ReactComponent as Close } from '../styles/images/close.svg';

// Redux
import { useDispatch } from "react-redux";
import { setCustomScenario } from '../Redux/sessionSlice.js';

const CustomPopUp = (props) => {
    const wrapperRef = useRef(null);

    const dispatch = useDispatch();

    const [text, setText] = useState("");

    const handlePageClick = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            props.onClose();
        }
    };

    const handleConfirm = () => {
        dispatch(setCustomScenario(text));
        props.onConfirm();
    }

    return (
        <div className={ styles.page } onClick={ handlePageClick } >
            <div className={ styles.wrapper } ref={ wrapperRef } >
                <Close className={styles.close_icon} onClick={props.onClose}/>
                <div className={ styles.textarea } >
                    <Textarea
                        placeholder="Set custom scenario..."
                        popUp = {true}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className={ styles.button } >
                    <Button
                        name="CONFIRM"
                        static={ false } //button width is static, even if page height changes
                        style={{ width: "100%" }}
                        press={ handleConfirm }
                        disabled={ text.trim() === "" }
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomPopUp;