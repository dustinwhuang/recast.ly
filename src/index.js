import React from 'react'
import ReactDOM from 'react-dom'
import jquery from '../node_modules/jquery/dist/jquery.js'
import App from './components/App.jsx'

ReactDOM.render(<App searchYouTube={window.searchYouTube} />, document.getElementById('app'));