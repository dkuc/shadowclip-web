import React from 'react';
import './Label.scss';

interface LabelProps {
    children?: any
};

const Label: React.FC<LabelProps> = (props) => {

    return (
        <label className='sh-label'> {props.children} </label>
    );
}

export default Label;
