import React, { Component } from 'react';
import Footer from '../components/Footer';

export default class Upload extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    // const { url } = this.state;
    // const curl = `${filestackAPI}/${API_KEY}/video_convert=preset:webm,aspect_mode:preserve/${url.substring(url.lastIndexOf('/') + 1)}`;
    // // First we call the process API to start the trascoding and get the uuid
    // try {
    //   let response = await fetch(curl);
    //   response = await response.json();
    //   const server = await this.sendToServer(response.uuid);
    //   hashHistory.replace('/');
    // } catch (e) {
    //   console.log(e);
    // }
  }

  render() {
    return (
      <div className="container" id="container">
        <div className="col-md-offset-4 media-list" id="upload-container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                <span className="glyphicon glyphicon-sunglasses" /> Upload Video
              </h2>
            </div>
            <div className="panel-body">
              <form name="document-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    className="form-control"
                    placeholder="Enter the title..."
                    ref={(input) => this.title = input}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input type="file" onChange={this.handleUploadFile} />
                    </div>
                  </div>
                </div>


                <button
                  className="btn btn-primary btn-block submit" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
