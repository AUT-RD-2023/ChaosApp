import React, { useState } from 'react';

function Input(props) {
    const [userInput, setUserInput] = useState('');

    // Keeps userInput value in sync with what user is writing.
    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    return (
        <>
            <form>
                <input id="gamePin" type="text" onChange={handleUserInput} value={userInput}>
                    {props.name}
                </input>
            </form>

            <h2>Current User Input: </h2>
            <h4>{userInput}</h4>

        </>
    );
}

export default Input;

