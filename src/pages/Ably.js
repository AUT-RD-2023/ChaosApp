import { React, useState } from 'react';
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import '../App.css';

import Button from '../components/Button.js'
import Input from '../components/Input.js'

configureAbly({ key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY"});

const Ably = () => {    
    const [messages, updateMessages] = useState([]);
    const [channel] = useChannel("lobby", (message) => { // useChannel call returns an instance of a channel
        updateMessages((prev) => [...prev, message]);
    });    

    const [nickname, setNickname] = useState("");

    const messagePreviews = messages.map((msg, index) => <li key={index}>{msg.data.text}</li>);

    return(
        <div className="App">
            <div className="title">Kia Rite</div>
            <div className="heading">GET STARTED</div>
            <div className="container">
                <Input placeholder="Enter Nickname" onChange={(e) => setNickname(e.target.value)}/>
                <Button name="NEXT" press={() => {channel.publish(("message"), { text: nickname })}}/>
            </div>
            {messagePreviews}
        </div>
    );
}

export default Ably;