// React
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setActivity, setAblyUsers } from '../Redux/sessionSlice.js';

// Database
import {onValue, ref, update} from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js';
import SlideSettings from '../components/SlideSettings.js';
import HowToPlay from '../components/HowToPlay.js';
import IconButton from '../components/IconButton.js';

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';


const LobbyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const settingsOpen = useSelector((state) => state.session.settingsOpen)
    const gamePin = useSelector((state) => state.session.gamePin)
    const playerId = useSelector((state) => state.session.playerId)
    const nickname = useSelector((state) => state.session.nickname)
    const isHost = useSelector((state) => state.session.isHost)

    /* ABLY */
    
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: playerId});

    const channelName = "" + gamePin;
    const [presenceUsers] = usePresence(channelName, { nickname: nickname });
    
    const [channel] = useChannel(channelName, (message) => { // Page navigation when host presses start
        if(message.data.text === "true") {
            navigate("/Bridge");
            dispatch(setActivity("start"));
        }
    });

    const handleStart = () => {
        startSession();
        for(let i = 0; i < presenceUsers.length; i++) {
            dispatch(setAblyUsers(presenceUsers[i].clientId));            
        }
        channel.publish("Start", { text: "true" });
    };

    /* DATABASE */

    useEffect(() => {
        if(isHost) {
            update(ref(database, 'lobby-' + gamePin), {
                gamePin: gamePin,
                inSession: false,
            });            
            //console.log(`Current game session added to database!\n[gamePin : ${gamePin}], [inSession : false]`);
        }
    }, [isHost, gamePin]);

    const [rounds, setRounds] = useState(2);
    const [responseTime, setResponseTime] = useState(60);
    const [discussionTime, setDiscussionTime] = useState(120);

    const responseTimeData = ref(database, 'lobby-' + gamePin + '/responseTime');
    const discussionTimeData = ref(database, 'lobby-' + gamePin + '/discussionTime');
    const roundsData = ref(database, 'lobby-' + gamePin + '/numRounds');

    useEffect(() => {
        onValue(responseTimeData, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setResponseTime(data);
            }
        });

        onValue(discussionTimeData, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setDiscussionTime(data);
            }
        });

        onValue(roundsData, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setRounds(data);
            }
        });
    }, [responseTimeData, discussionTimeData, roundsData]);

    function startSession() {
        update(ref(database, 'lobby-' + gamePin), {
            gamePin: gamePin,
            inSession: true,
            responseTime: responseTime,
            discussionTime: discussionTime,
            numRounds: rounds
        });
    }

    /* INVITE LINK */

    const [textVisible, setTextVisible] = useState(false);
    
    const copyUrl = () =>{
        navigator.clipboard.writeText(window.location.href + `/link/${gamePin}`);
        setTextVisible(true);

        setTimeout(() => {
            setTextVisible(false);
        }, 2000);
    };

    /* RENDER */

    const [isWindowLandscape, setIsWindowLandscape] = useState(window.innerHeight < window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsWindowLandscape(window.innerHeight < window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);    

    const playButtonJSX = (       
        <>
            <Button
                    name="PLAY"
                    static={ true } //button width is static, even if page height changes
                    press={ handleStart }
                />
            <div className={style.spacer}></div>
        </>);

    const inviteButtonJSX = (               
        <Button
            name={textVisible ? "✓" : "INVITE"}
            static={ true } //button width is static, even if page height changes
            press={copyUrl}
        />);

    return (
        <>
            <HowToPlay />
            {isHost ? isWindowLandscape ? <SlideSettings /> : (settingsOpen ? navigate("/SettingsPage") : <IconButton icon="settings" />) : null }
            <div className={style.page}>
            <div className={style.header}>
                <div className={style.subtitle}>Chaotic</div>
            </div>
            <div className={style.pin}>
                <span className={style.label}>GAME PIN: <br/></span>
                <span className={style.number}>&nbsp;{channelName}</span>
            </div>
            <div className={style.lobby}>
                <div className={style.buttons}>
                    {isHost ? playButtonJSX : null}
                    { inviteButtonJSX }
                </div>
                <div className={style.container}>
                    <div className={style.players}>
                        {presenceUsers.map((user, index) => (
                            <div key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default LobbyPage;