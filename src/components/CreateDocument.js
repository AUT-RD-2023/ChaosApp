// React
import React, {useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import { pdf, Page, Text, Document, StyleSheet, View, Image, Font } from '@react-pdf/renderer';

// Redux
import { useSelector } from "react-redux";

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import { ReactComponent as Download } from '../styles/images/download.svg';
import  Logo from '../styles/images/logo_with_ash.png';
import RubikRegular from '../styles/fonts/Rubik-Regular.ttf';
import RubikSemibold from '../styles/fonts/rubik-semi-bold.ttf';
import Quicksand from '../styles/fonts/quicksand-regular.otf';

Font.register({ family: 'Rubik', fonts: [
  {src:RubikRegular },
  {src: RubikSemibold, fontWeight: 'semibold'},
]});

Font.register({ family: 'Quicksand', src:Quicksand });


//Styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        textAlign: 'center',
    },
    title: {
      fontFamily: "Rubik",
        fontWeight: "semibold",
        fontSize: 36,
        color: "#2D7C73",
    }, 
    section: {
        paddingTop: 15
    },
    date: {
        fontSize: 12,
    },
    pin: {
        fontSize: 12,
    },
    subheading: {
      fontFamily: 'Quicksand',
        color: "#ADADAD",
        textAlign: 'left',
        paddingTop: 10
    },
    viewer: {
        textAlign: 'left',
      
    },
    response: {
      padding: 5
    },
    round: {
      fontWeight: 'bold',
      color: "#2D7C73",
    },
    votes: {
      fontWeight: "bold",

    }
})

function getCurrentDate() {
    const currentDate = new Date().toLocaleString() + "";

    return currentDate;
}

const CreateDocument = (props) => {
    const pages = Object.keys(props.roundData).map((roundNumber) => (
        <Page key={roundNumber} style={styles.page}>
          <Image src={Logo}></Image>
            <Text style={styles.title}>SESSION RESULTS </Text>
            <Text style={styles.dataTitle}>
            <Text style={styles.date}>Date: {props.date}</Text>
            <Text style={styles.pin}> GamePin: { props.gamePin }</Text>
            </Text>  
            
            <Text style={styles.section}> 
            <Text style={styles.round}>Round {roundNumber} {'\n'}</Text>
                <Text style={styles.subheading}>Scenario: {'\n'}
                </Text>
                { props.scenario }
            </Text>
             <Text style={styles.section}> 
                 <Text style={styles.subheading}>Responses: {'\n'}
                </Text>
                </Text>
          <View stlye={styles.viewer}> 
            {props.roundData[roundNumber].responses.map((response, index) => (
              <Text key={index} style={styles.response}>
                {response}{' '}
                <Text style={styles.votes}>
                  {props.roundData[roundNumber].votes[index] > 0
                    ? props.roundData[roundNumber].votes[index] === 1
                    ? props.roundData[roundNumber].votes[index] + ' Vote'
                    : props.roundData[roundNumber].votes[index] + ' Votes'
                  : ''}
                  </Text>
              </Text>
              
            ))}
          </View>
        </Page>
      ));
    
      return <Document>{pages}</Document>;
    };
    
    
    
    
    
    
    

export default function DownloadButton(props) {
    const gamePin = useSelector((state => state.session.gamePin));
    const ablyUsers = useSelector((state) => state.session.ablyUsers);
    const scenario = useSelector((state) => state.session.scenario);
    const round = useSelector((state) => state.session.round);
    
    const [RoundData, setRoundData] = useState([]); 

    useEffect(() => {
        const roundData = {};


        // Iterate through rounds
        for (let currentRound = 1; currentRound <= round; currentRound++) {
          roundData[currentRound] = {
            responses: [],
            votes: [],
          };
      
          // Iterate through users
          for (let i = 0; i < ablyUsers.length; i++) {
            const responseData = ref(database, `lobby-${gamePin}/responses/round-${currentRound}/${ablyUsers[i]}/response`);
            const voteData = ref(database, `lobby-${gamePin}/responses/round-${currentRound}/${ablyUsers[i]}/votes`);
      
            onValue(responseData, (snapshot) => {
              roundData[currentRound].responses.push(snapshot.val());
              setRoundData({ ...roundData });
            }, {
              onlyOnce: true
            });
      
            onValue(voteData, (snapshot) => {
              roundData[currentRound].votes.push(snapshot.val());
              setRoundData({ ...roundData });
            }, {
              onlyOnce: true
            });
          }
        } // eslint-disable-next-line
      }, []);
      

      return (
        <>
            <Download
                className={ props.className } 
                onClick={ 
                    async () => {
                    const document = <CreateDocument gamePin={ gamePin } scenario={ scenario } date={getCurrentDate()} 
                    roundData={ RoundData }/>
                    const asPDF = pdf();
                    asPDF.updateContainer(document);
                    const blob = await asPDF.toBlob();
                    saveAs(blob, `Chaotic-${gamePin}_game_results.pdf`);
                }}    
            />
        </>
    );
}

/*function DocumentLink() {
    const gamePin = useSelector((state => state.session.gamePin));
    const scenario = useSelector((state => state.session.scenario));

    return (
      <div>
        <PDFDownloadLink document={<CreateDocument gamePin={ gamePin } scenario={ scenario }/>} fileName={`Chaotic-${gamePin}_game_results.pdf`}>
            {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download')}
        </PDFDownloadLink>
      </div>
    );
}*/