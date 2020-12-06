import React from 'react';
import Logo from './Logo';
import './Logo.scss'

interface LogoLayered {
    size?: 'base' | 'sm' | 'md' | 'lg',
};

const LogoLayered: React.FC<LogoLayered> = (props) => {
  return (
    <section className='sh-logo-layered-wrapper'>
        <Logo size={props.size} isLayered/>
    </section>
  );
}

export default LogoLayered;

LogoLayered.defaultProps = {
    size: 'base'
}
