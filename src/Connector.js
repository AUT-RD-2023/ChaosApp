/*import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebase_config';

class Connector extends React.Component {
    constructor (props){
        super(props)
        
        this.state = {
            isConnected: false,
            database: null,
            gamePin: 0,
            inSession: false
        }
    }

    componentDidMount = async() => {
        firebase.initializeApp(firebaseConfig)
        
        this.setState({
            database: firebase.database()
        })
    }

    shouldComponentUpdate(nextProps, nextState) {        
        if(this.state.database !== nextState.database) { // Shouldn't render component if state database changed.
            return false;
        }
    }

    connect = async () => {
        try {
            const { database, gamePin }=this.state;
            await database.ref

        } catch (e) {
            console.error(e)
        }
    }
}

export default Connector;*/