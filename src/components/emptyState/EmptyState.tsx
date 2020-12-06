import React from 'react';

import './EmptyState.scss';
import { AlertCircle } from 'react-feather';


const EmptyState: React.FC = () => {

    return (
        <section className={`sh-empty-state`}>
            <div className='sh-empty-state__icon'>
                <AlertCircle size={48}/>
            </div>
            <h2 className='sh-empty-state__text'>
                oh no
            </h2>
        </section>
    );
}

export default EmptyState;
