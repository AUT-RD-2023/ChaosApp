// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setActivity, setAblyUsers, setNumRounds } from '../Redux/sessionSlice.js';

// Database
import { onValue, ref, update } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js';
import SlideSettings from '../components/SlideSettings.js';
import HowToPlay from '../components/HowToPlay.js';
import IconButton from '../components/IconButton.js';
import { ReactComponent as Logo } from '../styles/images/plain-logo.svg';

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';


const LobbyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const settingsOpen = useSelector((state) => state.session.settingsOpen);
    const gamePin = useSelector((state) => state.session.gamePin);
    const playerId = useSelector((state) => state.session.playerId);
    const nickname = useSelector((state) => state.session.nickname);
    const isHost = useSelector((state) => state.session.isHost);

    /* ABLY */
    
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: playerId});

    const channelName = "" + gamePin;
    const [presenceUsers] = usePresence(channelName, { nickname: nickname });
    
    const [channel] = useChannel(channelName, (message) => { 
        if(message.name === "Start") {
            dispatch(setNumRounds(message.data.number)); // Init total number of rounds for this session 
            dispatch(setActivity("start"));
            navigate("/Bridge"); // Page navigation when host presses start
        }
        if(message.name === "Set Client") {
            dispatch(setAblyUsers(message.data.text)); // Init the array of Ably users for all players' 
        }        
    });

    const handleStart = () => {                    
        startSession();    
        for(let i = 0; i < presenceUsers.length; i++) {
            channel.publish("Set Client", { text: presenceUsers[i].clientId });       
        }      
        channel.publish("Start", { number: rounds });
    };

    /* DATABASE */

    useEffect(() => {
        if(isHost) {
            update(ref(database, 'lobby-' + gamePin), {
                gamePin: gamePin,
                inSession: false,
            });            
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
            numRounds: rounds,
            numResponses: 0,
            numVotes: 0,
            numPlayers: presenceUsers.length,
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
                    static={ false }
                    press={ handleStart }
                />
            <div className={style.spacer}></div>
        </>);

    const inviteButtonJSX = (               
        <Button
            name={textVisible ? "✓" : "INVITE"}
            static={ false }
            press={copyUrl}
        />);

    return (
        <div className={style.page}>
            <HowToPlay isLobby="true"/>
            {isHost ? isWindowLandscape ? <SlideSettings /> : (settingsOpen ? navigate("/SettingsPage") : <IconButton icon="settings" />) : null }
            <div>
                <Logo className={style.logo}/>
                <div className={style.pin}>
                    <span className={style.label}>GAME PIN: <br/></span>
                    <span className={style.number}>&nbsp;{channelName}</span>
                </div>
            </div>
            <div className={style.container}>
                <div className={style.players}>
                    {presenceUsers.map((user, index) => (
                        <div className={style.grid_item} key={user.clientId}>{user.data.nickname}</div>
                    ))}
                </div>
            </div>
            <div className={style.buttons}>
                {isHost ? playButtonJSX : null}
                { inviteButtonJSX }
            </div>
        </div>
    );
}

export default LobbyPage;