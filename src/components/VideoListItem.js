import React from 'react';
import play_icon from 'src/assets/play.png';
import { Link } from 'react-router';

const VideoListItem = ({ video }) => {
    return (
        <li className="list-group-item">
            <Link to={`/videos/${video.id}`} style={{ textDecoration: 'none' }}>
                <div className="video-list media">
                    <div className="align-self-end mr-3">
                        <img className="media-object" src={play_icon} />
                    </div>

                    <div className="media-body">
                        <div className="mt-0" >{video.title}</div>
                        <div className="mt-0" >{video.status}</div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default VideoListItem;