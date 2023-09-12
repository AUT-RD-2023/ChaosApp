// React
import React, {useEffect, useState} from 'react';

// Styles
import style from "../styles/Tutorial.module.css";

// Carousel
import Carousel from "nuka-carousel";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// Components
import NicknamePage from '../pages/NicknamePage.js';
import DiscussionTutorial from '../components/DiscussionTutorial.js';
import ScenarioTutorial from '../components/ScenarioTutorial.js';
import VotingTutorial from '../components/VotingTutorial.js';
import WelcomeTutorial from '../components/WelcomeTutorial.js';


function TutorialPage() {

    // Chevron Rendering //

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

    return (
        <>
            <div className={style.header}>
                <div className={style.subtitle}>Chaotic</div>
                <div className={style.skip}>Skip</div>
            </div>
            <Carousel
                slidesToShow={1}
                defaultControlsConfig={{
                    pagingDotsStyle: {
                        fillOpacity: "0",
                        width: "2.5vh",
                        height: "2.5vh",
                        backgroundColor: "#75A78F",
                        margin: " 0 1.5vh 0",
                        borderRadius: "50%",
                    }
                }}
                renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                    isWindowLandscape === false ? null : (
                    currentSlide === 0 ? null : (
                    <Icon
                        className={style.chevron}
                        size={5}
                        path={mdiChevronLeft}
                        onClick={previousSlide}
                    />)
                    )
                )}
                renderCenterRightControls={({ nextSlide, currentSlide }) => (
                    isWindowLandscape === false ? null : (
                        currentSlide === 4 ? null : (
                            <Icon
                                className={style.chevron}
                                size={5}
                                path={mdiChevronRight}
                                onClick={nextSlide}
                            />)
                    )
                )}>
                <WelcomeTutorial/>
                <ScenarioTutorial/>
                <DiscussionTutorial/>
                <VotingTutorial/>
            </Carousel>
        </>
    );
}
export default TutorialPage;
