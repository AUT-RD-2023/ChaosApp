import React, { useState } from 'react';
import { configureAbly } from "@ably-labs/react-hooks";
import '../App.css';

import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'

let identityInstance;
configureAbly({ key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", playerId: createIdentity() });

function Ably() {
    const [nickname, setNickname] = useState("");
    const [identityArray, setIdentityArray] = useState([]);

    const handleClick = () => {
      identityInstance.addNickname(nickname);
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
              Key: {index} | ID: {identity.playerId} | Nickname: {identity.nickname}
            </li>
          );
        })}
      </div>
    );
}

function createIdentity() {
  identityInstance = new Identity();
  return identityInstance.playerId;
}

export default Ably;