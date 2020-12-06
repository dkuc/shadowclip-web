import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../logo/Logo';
import Tools from './Tools';

import './Masthead.scss';

const Masthead: React.FC = () => {
  return (
    <header className="sh-masthead">
        <Link to='/'><Logo/></Link>
        <Tools/>
    </header>
  );
}

export default Masthead;
