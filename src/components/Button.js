import React from 'react';
import styles from '../styles/Button.module.css';

function Button(props) {
    if(props.static === true) {
        return (
            <button className={styles.static_button} onClick={props.press} disabled={props.disabled}>
                {props.name}
            </button>
        );
    } else {
        return (
        <button className={styles.button} onClick={props.press} disabled={props.disabled}>
            {props.name}
        </button>
        )
    }
}

export default Button;