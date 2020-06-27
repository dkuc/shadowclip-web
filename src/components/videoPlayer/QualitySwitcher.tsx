import React, { useState } from 'react';

import './QualitySwitcher.scss';

interface QualitySwitcherProps {
    onChange?: any,
    isHD?: boolean
};

const QualitySwitcher: React.FC<QualitySwitcherProps> = (props) => {

    const [ isHighDef, setIsHighDef ] = useState(props.isHD);

    const toggleDef = () => {
        setIsHighDef(!isHighDef);
        props.onChange();
    }

    return (
        <div className='sh-quality-switcher'>
            <button className='sh-quality-switcher__button' disabled={isHighDef} onClick={toggleDef}>HD</button>
            <button className='sh-quality-switcher__button' disabled={!isHighDef} onClick={toggleDef}>SD</button>
        </div>
    );
}

export default QualitySwitcher;
