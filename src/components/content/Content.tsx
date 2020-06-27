import React from 'react';

import './Content.scss';

interface ContentProps {
    children: any,
    page?: string
};

const Content: React.FC<ContentProps> = (props) => {
    return (
        <section className={`sh-content sh-page-${props.page}`}>
            {props.children}
        </section>
    );
}

export default Content;
