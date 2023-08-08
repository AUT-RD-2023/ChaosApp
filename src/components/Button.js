import React from 'react';
import styles from '../styles/Button.module.css';

function Button(props) {
    return (
        <button className={styles.button} onClick={props.press} disabled={props.disabled}>
            {props.name}
        </button>
    );
}

export default Button;