import React from 'react';

import './Badge.scss';

interface ButtonProps {
    children: any,
    className?: string
};

const Badge: React.FC<ButtonProps> = (props) => {

    return (
        <span className={`sh-badge ${props.className}`}>
            { props.children }
        </span>
    );
}

export default Badge;
