import React from 'react';
import styles from '../styles/Button.module.css';
import style_alt from '../styles/CustomPopUp.module.css';

const TextArea = (props) => {

    return (
        <>
            <form>
                <textarea
                    className={ props.popUp ? style_alt.input : styles.textarea }
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