import React from 'react';

import Label from '../label/Label';

import './SearchBar.scss';

interface SearchBarProps {
    onChange: any,
    id: string,
    label?: string,
    placeHolder: string
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
    return (
        <span className='sh-search-bar'>
            { props.label && <Label> {props.label} </Label>}
            <input
                type='text'
                id={props.id}
                className={`sh-search-bar__input ${props.id}`}
                placeholder={props.placeHolder}
                onKeyUp={props.onChange}/>
        </span>
    );
}

export default SearchBar;
