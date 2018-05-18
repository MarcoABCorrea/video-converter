import React, { Component } from 'react';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import axios, { get } from 'axios';

export default class Videos extends Component {

  constructor(props) {
    super(props);
    this.state = { videosList: [] };

    this.populateVideos();
  }

  populateVideos() {
    axios.get('/videosList')
      .then(videosList => {
        this.setState({ videosList });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { videosList } = this.state;
    return (
      <main className="container" id="container">
        <div className="row" id="video-container">
          <VideoList videos={this.state.videosList} />
        </div>
        <Footer />
      </main>
    );
  }
}
