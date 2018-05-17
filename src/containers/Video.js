import React, { Component } from 'react';

export default class Video extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     video: {
        //         url: 'http://techslides.com/demos/sample-videos/small.mp4',
        //         title: 'Video 1'
        //     }
        // };
        this.state = { video: {} };
    }

    render() {
        if (!this.state.video.url) {
            return (<div>deu não</div>);
        }
        return (
            <div className="container" id="container">
                <div className="embed-responsive embed-responsive-16by9 video-player">
                    <video controls>
                        <source src={this.state.video.url} type="video/mp4" />
                    </video>
                </div>
                <div className="video-info">
                    <h4>{this.state.video.title}</h4>
                </div>
            </div>
        );
    }
};