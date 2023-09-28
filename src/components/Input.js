import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Button.module.css';

const Input = ({ value, onChange, placeholder, maxLength, settings }) => {

    const { pathname } = useLocation();

    const className = pathname === '/Lobby' || pathname === '/SettingsPage'
        ? styles.settings_input
        : styles.input;

    return (
        <>
            <form>
                <input
                    className={ className }
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
