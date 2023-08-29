import React from 'react';
import styles from '../styles/Button.module.css';

const TextArea = (props) => {

    const altStyle = {
        width: "100%",
        height: "min(28vw, 15vh)",
        border: "0.1vw solid #8E8D8A",
        borderRadius: "min(7.2vw, 2.5vh)",
        fontSize: "min(3.8vw, 2.2vh)",
        padding: "2vh 2vw 1vh 2.5vw",
        resize: "none",
        boxSizing: "border-box",
        color: "#000000",
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: '400',
        outline: "none"
    }

    let CSS;

    if (props.popUp === true) {
        CSS = altStyle;
    } else {
        CSS = styles.textarea;
    }


    return (
        <>
            <form>
                <textarea
                    style={ CSS }
                    id="gamePin"
                    value={props.value}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    maxLength={props.maxLength}
                />
            </form>
        </>
    );
}

export default TextArea;