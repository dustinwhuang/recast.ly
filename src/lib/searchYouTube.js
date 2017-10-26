var searchYouTube = (options, callback) => {
  // TODO
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      q: options.query,
      maxResults: options.max,
      key: options.key,
      pageToken: options.pageToken,
      videoEmbeddable: 'true',
      type: 'video'
    },
    success: data => callback(data.items, data.prevPageToken, data.nextPageToken),
    error: data => console.log('error:', data)
  });
};

window.searchYouTube = searchYouTube;

export default searchYouTube;