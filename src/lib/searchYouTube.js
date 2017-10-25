var searchYouTube = (options, callback) => {
  // TODO
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      q: options.query,
      maxResults: options.max,
      key: options.key,
      videoEmbeddable: 'true',
      type: 'video'
    },
    success: data => console.log('success:', data),
    error: data => console.log('error:', data)
  });
};

window.searchYouTube = searchYouTube;
