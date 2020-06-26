import React from 'react';

import './HeroVideo.scss';

const HeroVideo: React.FC = () => {
    return (
        <React.Fragment>
            <div className='sh-video-overlay'/>
            <video playsInline autoPlay muted loop className='sh-video-hero'>
                <source src="https://cloud.shadowclip.net/uploads/1112.mp4" type="video/mp4"/>
            </video>
        </React.Fragment>
    );
}

export default HeroVideo;
