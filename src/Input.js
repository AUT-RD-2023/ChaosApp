import React, { useState } from 'react';
import styles from './styles/Button.module.css';

function Input(props) {
    const [userInput, setUserInput] = useState('');

    // Keeps userInput value in sync with what user is writing.
    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    return (
        <>
            <form>
                <input
                    className={styles.input}
                    id="gamePin"
                    type="text"
                    onChange={handleUserInput}
                    placeholder={props.name}
                    value={userInput}
                    />
            </form>
        </>
    );
}

export default Input;
