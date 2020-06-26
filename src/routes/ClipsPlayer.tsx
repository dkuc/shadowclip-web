import React from 'react';
import VideoPage from '../components/videoPlayer/VideoPage';
import Main from '../components/main/Main';
import Content from '../components/content/Content';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import BreadcrumbItem from '../components/breadcrumbs/BreadcrumbItem';

interface ClipsPlayer {
  match: any,
  location?: any
};

const ClipsPlayer: React.FC<ClipsPlayer> = (props) => {
    return (
        <Main>
          <Breadcrumbs>
            <BreadcrumbItem to='/'> Home </BreadcrumbItem>
            <BreadcrumbItem to='/videos'> Videos </BreadcrumbItem>
            <BreadcrumbItem isActive> {props.match.params.id} </BreadcrumbItem>
          </Breadcrumbs>
          <Content page='video-player'>
            <VideoPage clip={props.location.state} id={props.match.params.id} />
          </Content>
        </Main>
    );
}

export default ClipsPlayer;
