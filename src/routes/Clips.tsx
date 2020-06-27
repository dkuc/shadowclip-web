import React from 'react';
import Table from '../components/table/Table';
import Main from '../components/main/Main';
import Content from '../components/content/Content';

import './Clips.scss';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import BreadcrumbItem from '../components/breadcrumbs/BreadcrumbItem';

const Clips: React.FC = () => {
    return (
        <React.Fragment>
            <Main>
                <Breadcrumbs>
                    <BreadcrumbItem to='/'> Home </BreadcrumbItem>
                    <BreadcrumbItem isActive> Videos </BreadcrumbItem>
                </Breadcrumbs>
                <Content page='videos'>
                    <Table/>
                </Content>
            </Main>
        </React.Fragment>
    );
}

export default Clips;
