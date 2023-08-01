import React, { useState } from 'react';
import Identity from '../identity';

function createId(){

    const identity = new Identity('test nickname');
    const[identityInstance] = useState(identity);
    
    return(
        <>
            <p>Nickname: {playerInstance.nickname}</p>
            
            <p>ID: {playerInstance.clientId}</p>
        </>
    );
}

export default createId;