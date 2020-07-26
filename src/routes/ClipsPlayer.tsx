import React from 'react';
import VideoPage from '../components/videoPlayer/VideoPage';
import Main from '../components/main/Main';
import Content from '../components/content/Content';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import BreadcrumbItem from '../components/breadcrumbs/BreadcrumbItem';
// @ts-ignore
import MetaTags from 'react-meta-tags';

interface ClipsPlayer {
  match: any,
  location?: any
};

const ClipsPlayer: React.FC<ClipsPlayer> = (props) => {
    return (
        <Main>
            <MetaTags>
                 <meta property="og:title" content={props.match.params.id} />
                 <meta property='og:site_name' content='Shadow Clip' />
                 <meta property='og:type' content='video.other' />
                 <meta property='og:image' content={`https://shadowclip.net/thumbnails/${props.match.params.id}.mp4.jpg`} />
                 <meta property='og:image:secure_url' content={`https://shadowclip.net/thumbnails/${props.match.params.id}.mp4.jpg`} />
                 <meta property='og:image:type' content='image/jpeg' />
            </MetaTags>
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
