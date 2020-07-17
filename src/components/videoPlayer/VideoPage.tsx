import React, { useEffect, useState } from 'react';

import './VideoPlayer.scss';
import Spinner from '../spinner/Spinner';

// @ts-ignore
import { Player, BigPlayButton, ControlBar, Shortcut } from 'video-react';
import VideoDescription from './VideoDescription';

interface VideoPlayerProps {
  clip?: any,
  id?: any
};

interface clipDataProps {
  name?: string,
  fileName?: string,
  views?: number,
  date?: string,
  uploadedBy?: string
}

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
      if(!props.clip) {
        fetch(
          'https://shadowclip.net/videos/data',
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json"
            })
          }
        )
        .then(res => res.json())
        .then(response => {
          filterClipData(response);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
      } else {
        setClipData(props.clip);
        setIsLoading(false);
      }
  }, []);

  const shortCuts = [
    {
      keyCode: 39, // Right arrow
      handle: (player: any, actions: any) => {
        console.log(player);
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
        console.log(player);
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
        console.log(player);
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
        console.log(player);
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
              <Player src={ isMobile ? `https://${urlPrefix}shadowclip.net/mobile/${clipData.fileName}` :`https://${urlPrefix}shadowclip.net/uploads/${clipData.fileName}`}>
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
