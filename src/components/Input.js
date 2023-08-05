import React, { useState } from 'react';
import styles from '../styles/Button.module.css';

const Input = ({ value, onChange, placeholder, maxLength }) => {
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
                    maxLength={maxLength}
                />
            </form>
        </>
    );
}

export default Input;
