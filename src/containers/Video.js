import React, { Component } from 'react';
import axios, { get } from 'axios';

export default class Video extends Component {

    constructor(props) {
        super(props);
        this.state = { video: {} };
        this.getVideo();
    }

    getVideo() {
        axios.get('/getVideo', { params: { etag: this.props.params.etag } })
            .then((res) => {
                this.setState({ video: { url: res.data.url, title: res.data.title } });
            })
            .catch(err => console.log(err));
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