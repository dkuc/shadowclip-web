import React from 'react';

import Landing from '../components/landing/Landing';
import Main from '../components/main/Main';

const Home: React.FC = () => {
    return (
        <Main isLanding><Landing/></Main>
    );
}

export default Home;
