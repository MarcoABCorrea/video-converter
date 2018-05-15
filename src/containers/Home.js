import React, { Component } from 'react';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import Nav from '../components/Nav';
import Video from './Video';
// import { API } from '../config';

export default class Home extends Component {

  constructor(props) {
    super(props);
    // Set the videoList to empty array
    this.state = { videosList: [
      { url: 'https://cdn.filestackcontent.com/SLaOvbGTR8asBBLCn1u9', 
        title: 'marco 1' },
        { url: 'https://cdn.filestackcontent.com/SLaOvbGTR8asBBLCn1u9', 
        title: 'marco 2' }
      ], 
      
      selectedVideo: {} };
  }

  // async componentDidMount () {
  //   // Calls GET /api/v1/videos to populate videosList
  //   try {
  //     const response = await fetch(API);
  //     const videosList = await response.json();
  //     this.setState({ videosList });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    const { videosList } = this.state;
    return (
      <main className="container" id="container">
        <div className="row" id="video-container">
          <Video video={this.state.selectedVideo} />
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videosList} />
        </div>
        <Footer />
      </main>
    );
  }
}
