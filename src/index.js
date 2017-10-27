import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, hashHistory, Switch } from 'react-router-dom'
import jquery from '../node_modules/jquery/dist/jquery.js'
import App from './components/App.jsx'
// import App from './components/testDiv.jsx'
import test from './components/testDiv.jsx'

ReactDOM.render(
  (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <App searchYouTube={searchYouTube}/>}/>
        <Route path="/test" component={test} />
      </Switch>
    </Router>
  ),
  document.getElementById('app'));


// <App searchYouTube={window.searchYouTube} />
// <Router history={hashHistory}>
//   <Route path="/" component={testDiv} />
//   <Route path="/test" component={testDiv} />
// </Router>

//component={App} searchYouTube={window.searchYouTube}/>