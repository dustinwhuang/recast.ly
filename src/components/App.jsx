class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {video: window.exampleVideoData[0], videos: window.exampleVideoData};

    props.searchYouTube({query: 'React.js', max: 5, key: window.YOUTUBE_API_KEY}, (data) => this.setState({video: data[0], videos: data}));
  }

  handleListClick(event) {
    for (let i = 0; i < this.state.videos.length; i++) {
      if (this.state.videos[i].snippet.title === $(event.target).text()) {
        this.setState({video: this.state.videos[i]}); 
      }
    }
  }
  
  updateVideos(data) {
    this.setState({video: data[0], videos: data});
  }

  handleSubmit(event) {
    let query = $('.form-control').val();
    let options = {query: query, max: 5, key: window.YOUTUBE_API_KEY};
    this.props.searchYouTube(options, this.updateVideos.bind(this));
  }

  handleChange(event) {
    let query = $('.form-control').val();
    let options = {query: query, max: 5, key: window.YOUTUBE_API_KEY};
    clearTimeout(this.state.debounce);
    this.setState( {debounce: setTimeout(() => this.props.searchYouTube(options, this.updateVideos.bind(this)), 500) });
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
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App searchYouTube={window.searchYouTube} />, document.getElementById('app'));
