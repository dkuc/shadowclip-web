import React from 'react';

import './Breadcrumbs.scss';

interface Breadcrumbs {
    children: any,
};

const Breadcrumbs: React.FC<Breadcrumbs> = (props) => {

    return (
        <section className='sh-breadcrumbs'>
            { props.children }
        </section>
    );
}

export default Breadcrumbs;
