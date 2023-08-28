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
            {/*Bold nickname does not match the figma design and makes the rounds and title disproportional*/}
            <div className="name">{ nickname.toUpperCase() }</div>
            <div className="round">ROUND { round }/{ numRounds }</div>
        </>
    );
}

export default Header;

