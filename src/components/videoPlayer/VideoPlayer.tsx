import React from 'react';

import './VideoPlayer.scss';

interface VideoPlayerProps {
    id?: string
  };

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
    return (
        <div className='sh-video-player'>
            <video playsInline>
                <source src={`https://shadowclip.net/uploads/${props.id}`} type='video/mp4'/>
            </video>
        </div>
    );
}

export default VideoPlayer;
