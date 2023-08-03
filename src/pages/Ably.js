import React, { useState } from 'react';
import { configureAbly } from "@ably-labs/react-hooks";
import '../App.css';
import Ably from "ably/promises";

import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'

let identity;

function JoinAbly() {
    const [nickname, setNickname] = useState("");
    const handleClick = () => {
      const identity = createIdentity();
      identity.makeNickname(nickname);
      const realtime = new Ably.Realtime({ key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});
      const channel = realtime.channels.get('guy-hue-hip');
      channel.presence.subscribe('enter', function(player) {
        console.log('Player ' + player.clientId + ' | ' + player.data +  ' entered');
      });
      channel.presence.enter(identity.nickname);
      // Route to lobby page.
    }

    return (
      <div className="App">
        <div className="title">Chaos</div>
        <div className="heading">GET STARTED</div>
        <div className="container">
          <Input
            placeholder="Enter Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button name="NEXT" press={handleClick} />
        </div>
        {/* {identityArray.map((identity, index) => {
          return (
            <li key={index}>
              Key: {index} | ID: {identity.playerId} | Nickname: {identity.nickname}
            </li>
          );
        })} */}
      </div>
    );
}

function createIdentity() {
  return new Identity();
}

export default JoinAbly;