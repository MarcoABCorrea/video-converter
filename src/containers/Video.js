import React from 'react';

const Video = ({ video }) => {
    if (!video.url) {
        return <div className="col-md-8">Click a video to play it.</div>;
    }

    // const videoId = video.id.videoId;
    // const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className="col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <video controls>
                    <source src={video.url} type="video/mp4" />
                </video>
            </div>
            <div className="video-info">
                <h4>{video.title}</h4>
                {/* <p>{author}</p>
                <p>{views} views • {uploadAt} hours ago</p> */}
            </div>
        </div>
    );
};

export default Video;