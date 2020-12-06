import React from 'react';

import './Toolbar.scss';

interface ToolbarItemProps {
    children: any,
    className?: string
};

const ToolbarItem: React.FC<ToolbarItemProps> = (props) => {
    return (
        <div className={`sh-toolbar-item ${props.className}`}>
            {props.children}
        </div>
    );
}

export default ToolbarItem;
