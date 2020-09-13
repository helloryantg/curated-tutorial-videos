import React, { useEffect, useState } from 'react';
import './ListPage.scss';
import videoListActions from '../../actions/videoList.action';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

function ListPage(props) {
  const {
    videoLists,
    dispatch,
    match,
    videos,
    videoList,
  } = props;
  
  const {
    listId,
  } = match.params;

  const [currentVideos, setCurrentVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});

  useEffect(() => {
    dispatch(videoListActions.getVideoList(listId));
    dispatch(videoListActions.getVideoListVideos(listId));
  }, [])

  useEffect(() => {
    setCurrentVideos(videos);
  }, [videos]);

  useEffect(() => {
    setCurrentVideo(videoList);
  }, [videoList])
  
  // Test list page - http://localhost:3000/list/5e66c35fc0055d7503f48f2e
  // Longer test http://localhost:3000/list/5e6411e05d938c317b873924

  return (
    <div className="ListPage">
      <h2>{currentVideo.name}</h2>
      {
        currentVideos.map((video, idx) => {
          return (
            <div 
              className="video-container"
              key={video._id}
            >
              <div 
                className="video"
              >
                <ReactPlayer
                  url={video.url}
                  light={true}
                  height={'100%'}
                  width={'100%'}
                />
              </div>
            </div>  
          )
        })
      }
    </div>
  )
}

const mapState = ({ reducers }) => ({
  videos: reducers.videos,
  videoList: reducers.videoList,
})

export default connect(mapState)(ListPage);