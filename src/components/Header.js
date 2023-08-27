// React
import React from 'react';

// Redux
import { useSelector } from "react-redux";

const Header = () => {
    const nickname = useSelector((state) => state.session.nickname);
    const round = useSelector((state) => state.session.round);
    const numRounds = useSelector((state) => state.session.numRounds);

    return (
        <>
            <div className="name"><strong>{ nickname.toUpperCase() }</strong></div>
            <div className="round">ROUND { round }/{ numRounds }</div>
        </>
    );
}

export default Header;

