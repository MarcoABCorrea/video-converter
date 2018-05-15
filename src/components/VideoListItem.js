import React from 'react';
// import play_icon from '../play.png';

const VideoListItem = ({ video, onVideoSelect }) => {
    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="align-self-end mr-3">
                    <img className="media-object" src={``} />
                </div>

                <div className="media-body">
                    <div className="mt-0" >{video.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;