import React from 'react';

import Label from '../label/Label';

import './Select.scss';

interface SelectProps {
    onChange: any,
    id: string,
    children: any,
    defaultValue?: string,
    label?: string
};

const Select: React.FC<SelectProps> = (props) => {
    return (
        <span className='sh-select'>
            { props.label && <Label>{props.label}</Label> }
            <select
                id={props.id}
                defaultValue={props.defaultValue}
                className={`sh-select__input ${props.id}`}
                onChange={props.onChange}>
                {props.children}
            </select>
        </span>
    );
}

export default Select;
