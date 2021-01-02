import React from 'react';

import './Landing.scss';
import Button from '../button/Button';
import HeroVideo from '../heroVideo/HeroVideo';
import LogoLayered from '../logo/LayeredLogo';

const Landing: React.FC = () => {
    return (
        <div className='sh-landing-cta'>
            <HeroVideo/>
            <LogoLayered size='lg'/>
            <section className='sh-landing-cta__buton-wrapper'>
                <Button to='/videos?sort_by=CREATED_AT.DESC' variant='ghost'>Watch Clips</Button>
                <Button href='https://shadowclip.net/shadowclip/setup.exe' variant='light'>Download</Button>
            </section>
        </div>
    );
}

export default Landing;
