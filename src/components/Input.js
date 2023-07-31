import React, { useState } from 'react';
import styles from '../styles/Button.module.css';

const Input = ({ value, onChange, placeholder }) => {
    return (
        <>
            <form>
                <input
                    className={styles.input}
                    id="gamePin"
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
            </form>
        </>
    );
}

export default Input;
