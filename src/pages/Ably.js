
/*    
Bugged code:
    updateStatus("new status");

    // Convert presence data to list items in render.
    const members = presenceData.map((msg, index) => <li key={index}>{msg.clientId}:{msg.data}</li>);
}
*/
import React, { useState } from 'react';
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import '../App.css';

import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'

configureAbly({ key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: generateRandomId() });

function Ably() {
     const [messages, updateMessages] = useState([]);
     const [channel] = useChannel("your-channel-name", (message) => {
        updateMessages((prev) => [...prev, message]);
    });

    const [nickname, setNickname] = useState("");

    const [presenceData] = usePresence("your-channel-name", (update) => {
        console.log(update);
    });

    const [identityArray, setIdentityArray] = useState([]);

    const handleClick = () => {
        const identityInstance = createIdentity(nickname);
        setIdentityArray(current => [...current, identityInstance])
    }

    return (
      <div className="App">
        <div className="title">Chaos App</div>
        <div className="heading">GET STARTED</div>
        <div className="container">
          <Input
            placeholder="Enter Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button name="NEXT" press={handleClick} />
        </div>

        {identityArray.map((identity, index) => {
          return (
            <li key={index}>
              ID: {identity.clientId} | Nickname: {identity.nickname}
            </li>
          );
        })}
      </div>
    );
}

function createIdentity(nickname) {
    return new Identity(nickname);
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 9);
}

export default Ably;