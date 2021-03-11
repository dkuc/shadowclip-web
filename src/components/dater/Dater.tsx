import React from 'react';

interface DaterProps {
    createdAt: any,
    isBold?: boolean
};

const Dater: React.FC<DaterProps> = (props) => {

    const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: true,
      };

    const formattedDate = new Intl.DateTimeFormat('default', dateOptions).format(new Date(props.createdAt));

    return (
        <React.Fragment>
            { props.isBold
                ? <b> { formattedDate }</b>
                : <span>{ formattedDate }</span>
            }
        </React.Fragment>
    );
}

export default Dater;
