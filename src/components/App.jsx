class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {video: window.exampleVideoData[0], videos: window.exampleVideoData};

    props.searchYouTube((data) => this.state = {video: data[0], videos: data}, {});
  }

  handleListClick(event) {
    console.log('event.target', event.target);

    for (let i = 0; i < window.exampleVideoData.length; i++) {
      if (window.exampleVideoData[i].snippet.title === $(event.target).text()) {
        this.setState({video: window.exampleVideoData[i]}); 
      }
    }
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
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
