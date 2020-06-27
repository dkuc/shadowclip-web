import React from 'react';
import { Video, GitHub, Download } from 'react-feather';
import './Tools.scss';
import IconButton from '../button/IconButton';

const Tools: React.FC = () => {
    return (
        <div className="sh-tools">
            <IconButton to='/videos'><Video/></IconButton>
            <IconButton href='https://shadowclip.net/shadowclip/setup.exe'><Download/></IconButton>
            <IconButton href='https://github.com/dkuc/shadowclip'><GitHub/></IconButton>
        </div>
    );
}

export default Tools;
