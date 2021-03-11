import React from 'react';
import Dater from '../dater/Dater';
import Badge from '../badge/Badge';
import Button from '../button/Button';

import './VideoDescription.scss';
import QualitySwitcher from './QualitySwitcher';
import Separator from '../separator/Separator';

interface VideoDescriptionProps {
    video: {
        title?: string,
        views?: number,
        createdAt?: string,
        userHash?: string
    }
    onQualitySwitch?: any,
    loadedFrom?: string,
    onLoadFromChange?: any
};

const VideoDescription: React.FC<VideoDescriptionProps> = (props) => {
    return (
        <div className='sh-video-player__toolbar'>
            <div className='sh-video-player__toolbar-details'>
                <h1 className='sh-video-player__toolbar-title'>
                    {props.video.title}
                    <Badge className='sh-clip-list-item__details--views'>{props.video.views} {props.video.views === 1 ? 'view' : 'views'}</Badge>
                </h1>
                <h3 className='sh-video-player__toolbar-uploaded'>Uploaded by {props.video.userHash} on <Dater createdAt={props.video.createdAt}/></h3>
                <h3 className='sh-video-player__toolbar-loadedFrom'>
                    Loaded {props.loadedFrom === 'cloud' ? 'from cloud' : 'directly'}
                    <Separator/>
                    <Button onClick={props.onLoadFromChange}> Load {props.loadedFrom === 'cloud' ? 'directly' : 'from cloud'}? </Button>
                </h3>
            </div>
            <div className='sh-video-player__toolbar-tools'>
                <QualitySwitcher isHD={true} onChange={props.onQualitySwitch}/>
            </div>
        </div>
    );
}

export default VideoDescription;
