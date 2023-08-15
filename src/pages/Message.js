import '../App.css';
import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { useLocation } from "react-router-dom";
const Message = () => {
    const location = useLocation();

    const { state } = location;
    const channelName = state.channel;
    const [message, setMessage] = useState('');
    const [messages, updateMessages] = useState([]);

    // Receive and send messages from Ably
    const [channel] = useChannel(channelName, (message) => {
        updateMessages((prev) => [...prev, message]);
    });
    const sendMessage = () => {
        if (channel && message.trim() !== '') {
            channel.publish("Response", { text: state.nickname + ": " + message });
            setMessage('');
        }
    };

    const messagePreviews = messages.map((msg, index) => <li key={index}>{msg.data.text}</li>);

    return (
        <div className="App">
            <p>The channel is: {channelName}</p>
            <p>My name is: { state.nickname }</p><br /> <br />
            <input
                type="text"
                placeholder="Input response"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Submit</button>

            <h2>Responses</h2>
            <ul>{messagePreviews}</ul>
        </div>
    );
}

export default Message;