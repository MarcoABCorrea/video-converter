import React, { Component } from 'react';
import Footer from '../components/Footer';
import axios, { post } from 'axios';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', 'file');

    return axios({
      method: 'post',
      url: '/fileUpload',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    });
  }

  render() {
    return (
      <div className="container" id="container">
        <div className="col-md-offset-4 media-list" id="upload-container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                <span /> Upload Video
              </h2>
            </div>
            <div className="panel-body">
              <form name="document-form" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input type="file" onChange={this.onChange} />
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
