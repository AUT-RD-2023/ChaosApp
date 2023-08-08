import React, { useState } from 'react';
import Identity from '../identity';

function CreateId(props){

    const identity = new Identity(props.nickname);
    const [identityInstance] = useState(identity);
    
    return(
        <>
            <p>Nickname: {identityInstance.nickname}</p>
            
            <p>ID: {identityInstance.clientId}</p>
        </>
    );
}

export default CreateId;