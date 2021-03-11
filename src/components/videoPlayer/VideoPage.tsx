import React, { useEffect, useState } from 'react';

import './VideoPlayer.scss';
import Spinner from '../spinner/Spinner';

// @ts-ignore
import { Player, BigPlayButton, ControlBar, Shortcut } from 'video-react';
import VideoDescription from './VideoDescription';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

interface VideoPlayerProps {
  clip?: any,
  id?: any
};

interface clipDataProps {
  name?: string,
  videoUrl?: string,
  mobileUrl?: string,
  views?: number,
  date?: string,
  uploadedBy?: string
}

const client = new ApolloClient({
  uri: 'https://beta.shadowclip.net/graphql',
  cache: new InMemoryCache()
});
const VIDEO_QUERY = gql`
  query GetSingleVideo($title: String!) {
    videoByTitle(title: $title) {
      id
      canDelete
      createdAt
      fileSize
      thumbnailUrl
      title
      userHash
      views
      videoUrl
      mobileUrl
    }
  }
`;

const VideoPage: React.FC<VideoPlayerProps> = (props) => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ isCloudLoad, setIsCloudLoad ] = useState(false);
    const [ clipData, setClipData ] = useState<clipDataProps>({
      name: 'Loading',
      views: 0,
      date: '2020-06-23T22:48:29.751Z',
      uploadedBy: 'Ryan'
    });

    const filterClipData = (data:any) => {
      // @ts-ignore
      const filteredData = data.filter(item => item.name === props.id);
      setClipData(filteredData[0]);
    }

    useEffect(() => {
      client.query({query:VIDEO_QUERY,variables:{title:props.id}})
      .then(res => {
        const videoData = res.data.videoByTitle;
        setClipData(videoData);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const shortCuts = [
    {
      keyCode: 39, // Right arrow
      handle: (player: any, actions: any) => {
        const operation = {
          action: 'forward-1',
          source: 'shortcut'
        };
        // jump one frame forward
        actions.forward(.015, operation);
      }
    },
    {
      keyCode: 37, // left arrow
      handle: (player: any, actions: any) => {
        const operation = {
          action: 'replay-1', // backwards being called replay is dumb
          source: 'shortcut'
        };
        // jump one frame back
        actions.replay(.015, operation);
      }
    },
  ];

  const mobileShortCuts = [
    {
      keyCode: 39, // Right arrow
      handle: (player: any, actions: any) => {
        const operation = {
          action: 'forward-1',
          source: 'shortcut'
        };
        // jump one frame forward
        actions.forward(.03, operation);
      }
    },
    {
      keyCode: 37, // left arrow
      handle: (player: any, actions: any) => {
        const operation = {
          action: 'replay-1', // backwards being called replay is dumb
          source: 'shortcut'
        };
        // jump one frame back
        actions.replay(.03, operation);
      }
    },
  ];

  const urlPrefix = isCloudLoad ? 'cloud.' : '';
  return (
      <React.Fragment>
        { isLoading
          ? <Spinner/>
          : <div className='sh-video-player'>
              <Player playsInline autoPlay
                      src={isMobile ? clipData.mobileUrl : clipData.videoUrl}
                      // @ts-ignore
                      ref={player => {if (player) player.volume = 0.2}}
              >
                <BigPlayButton position='center' />
                <Shortcut shortcuts={ isMobile ? mobileShortCuts : shortCuts}/>
                <ControlBar autoHide={false} className='sh-vidåeo-player__control'/>
              </Player>
            <VideoDescription
              video={clipData}
              onQualitySwitch={() => setIsMobile(!isMobile)}
              loadedFrom={isCloudLoad ? 'cloud' : 'direct'}
              onLoadFromChange={() => setIsCloudLoad(!isCloudLoad)}
              />
          </div>
        }
      </React.Fragment>
  );
}

export default VideoPage;
