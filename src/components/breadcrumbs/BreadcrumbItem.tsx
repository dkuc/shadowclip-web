import React from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItemProps {
    children: any,
    to?: any
    isActive?: boolean
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {

    return (
      <React.Fragment>
      { props.isActive
        ? <span className='sh-breadcrumbs-item__active'> { props.children } </span>
        : <React.Fragment>
            <Link to={props.to} className='sh-breadcrumbs-item'> {props.children} </Link>
            <ChevronRight className='sh-breadcrumbs-chevron'/>
          </React.Fragment>
      }

      </React.Fragment>
    );
}

export default BreadcrumbItem;
