
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

    const messagePreviews = messages.map((msg, index) => <li key={index}>{msg.data.text}</li>);
    const presentClients = presenceData.map((msg, index) => (
        <li key={index}>
            ID: {msg.clientId}  |  Nickname: {nickname}
        </li>
    ));

    return (
        <div className="App">
            <div className="title">Chaos App</div>
            <div className="heading">GET STARTED</div>
            <div className="container">
                {<Input placeholder="Enter Nickname" onChange={(e) => setNickname(e.target.value)}/>}
                {<Button name="NEXT" press={() => {channel.publish(("message"), { text: nickname })}}/>}
            </div>
            <h2>Present Clients</h2>
            <ul>{presentClients}</ul>
            <h2>Nicknames</h2>
            <ul>{messagePreviews}</ul>
        </div>
    );
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 9);
}

export default Ably;