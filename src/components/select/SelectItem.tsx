import React from 'react';

import './Select.scss';

interface SelectItemProps {
    children: any,
    value: string,
    selected?: boolean
};

function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const SelectItem: React.FC<SelectItemProps> = (props) => {
    return (
        <option
            className='sh-select-item'
            data-sort={props.value}
            selected={props.selected}
            value={props.value}>{capitalize(props.children)}</option>
    );
}

export default SelectItem;
