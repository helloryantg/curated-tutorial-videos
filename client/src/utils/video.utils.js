const getVideoIdFromUrl = url => {
  return url.split('=')[1]
}

export default {
  getVideoIdFromUrl
}