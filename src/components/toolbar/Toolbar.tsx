import React from 'react';

import './Toolbar.scss';

interface ToolbarProps {
    children: any,
    className?: string
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
    return (
        <div className={`sh-toolbar ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Toolbar;
