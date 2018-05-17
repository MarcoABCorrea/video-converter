import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
    if(!props.videos.data) {
        return (
            <div>Nenhum vídeo</div>
        );
    }

    const videoItems = props.videos.data.map((video) => {
        return (
            <VideoListItem video={video} />
        );
    });
    
    return (
        <ul className="col-lg-6 col-lg-offset-6 col-sm-12 col-sm-offset-0 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;