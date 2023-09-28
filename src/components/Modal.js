import React, { useEffect, useState } from 'react';

// Components
import DownloadButton from "../components/CreateDocument.js";
import { emailBody, emailSubj } from '../components/CreateEmail.js'

//Redux
import { useSelector } from "react-redux";

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Styles
import '../styles/Modal.css';

// Icons
import { ReactComponent as Email } from '../styles/images/email.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';

function Modal({closeModal}) {
    const gamePin = useSelector((state => state.session.gamePin));
    const scenario = useSelector((state => state.session.scenario));        
    const round = useSelector((state) => state.session.round);    
    const ablyUsers = useSelector((state) => state.session.ablyUsers);

    const [responseArray, setResponseArray] = useState([]); 

    useEffect(() => {      
        for(let j = 0; j < round; j++)  {
            for(let i = 0; i < ablyUsers.length; i++) {
                const responseData = ref(database, `lobby-${gamePin}/responses/round-${j + 1}/${ablyUsers[i]}/response`);

                onValue(responseData, (snapshot) => {
                    setResponseArray(oldArray => [...oldArray, snapshot.val()]);
                }, {
                    onlyOnce: true
                });  
            }
        } // eslint-disable-next-line
      }, []); 

      const arrayToString = (array) => {
        let text = "";

        for(let i = 0; i < array.length; i++) {
            text += "%0D%0A" + array[i] + "%0D%0A";
        }

        return text;
      }

    console.log(arrayToString(responseArray));

    const handleModalBackgroundClick = () => {
        closeModal(false);
    };

    const handleModalContainerClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modalBackground" onClick={handleModalBackgroundClick}>
            <div className="modalContainer" onClick={handleModalContainerClick}>
                <div className="modalTop">
                    <div className="shareText">Share</div>
                    <div className="closeButton">
                        <Close className="modal_close" onClick={() => closeModal(false)} />
                    </div>
                </div>
                <div className="modalButtons">
                    <DownloadButton
                        className="modalIcons"
                    />
                    <Email
                        className="modalIcons"
                        onClick={ () => {
                            window.location.href = `mailto:example@email.com?
                                subject=${emailSubj(gamePin)}
                                &body=${emailBody(gamePin, scenario, arrayToString(responseArray))}`
                        }}
                    />
                    <div className="buttonText">Download</div>
                    <div className="buttonText">Email</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;