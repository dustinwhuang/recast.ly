import React from 'react';
import Search from './Search.jsx';
import VideoList from './VideoList.jsx';
import VideoPlayer from './VideoPlayer.jsx'
import searchYouTube from '../lib/searchYouTube.js'
import youtube from '../config/youtube.js'
import exampleVideoData from '../data/exampleVideoData.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {video: window.exampleVideoData[0], videos: window.exampleVideoData};

    props.searchYouTube({query: '', max: 5, key: window.YOUTUBE_API_KEY}, (data) => this.setState({video: data[0], videos: data}));
  }

  handleListClick(event) {
    for (let i = 0; i < this.state.videos.length; i++) {
      if (this.state.videos[i].snippet.title === $(event.target).text()) {
        this.setState({video: this.state.videos[i]}); 
      }
    }
  }
  
  updateVideos(data, prevPageToken, nextPageToken) {
    this.setState({video: data[0], videos: data, prevPageToken: prevPageToken, nextPageToken: nextPageToken});
  }

  handleSubmit(event) {
    this.search();
  }

  handleChange(event) {
    clearTimeout(this.state.debounce);
    this.setState( {debounce: setTimeout(() => this.search(), 500) });
  }

  handlePrevClick() {
    this.search(this.state.prevPageToken);
  }

  handleNextClick() {
    this.search(this.state.nextPageToken);
  }

  search(pageToken) {
    let query = $('.form-control').val();
    let options = {query: query, max: 5, key: window.YOUTUBE_API_KEY, pageToken: pageToken};
    this.props.searchYouTube(options, this.updateVideos.bind(this));
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleClick={this.handleListClick.bind(this)}/>
            <div className="pageButtons"><button onClick={this.handlePrevClick.bind(this)}>Previous</button><button onClick={this.handleNextClick.bind(this)}>Next</button></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;


export default App;
