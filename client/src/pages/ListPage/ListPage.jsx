import React, { useEffect, useState, useRef } from 'react';
import './ListPage.scss';
import videoListActions from '../../actions/videoList.action';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { FiMoreVertical } from "react-icons/fi";

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
  const [displayMenuId, setDisplayMenuId] = useState('');
  const [options, setOptions] = useState({});

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

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  // Test list page - http://localhost:3000/list/5e66c35fc0055d7503f48f2e
  // Longer test http://localhost:3000/list/5e6411e05d938c317b873924

  const handleOptionsClick = videoId => {
    displayMenuId === videoId 
      ? setDisplayMenuId('')
      : setDisplayMenuId(videoId);
  }

  const handleClick = e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (options.toString().includes(e.target.toString())) {
      setDisplayMenuId('');
      setOptions({});
    }
  }

  const handleEditClick = video => {
    console.log('edit video');
  }

  const handleDeleteClick = video => {
    console.log('delete video');
  }

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

              <div className="text-container">
                <div className="top">
                  <h3 className="title">{video.title}</h3>
                  <div className="right" ref={node => setOptions(node)}>
                    <FiMoreVertical
                      title='options' 
                      onClick={() => handleOptionsClick(video._id)}
                    />
                    <div className={`hidden-options ${displayMenuId === video._id ? 'visible' : ''}`}>
                      <div className="options">
                        <div className="option" onClick={() => handleEditClick(video)}>Edit</div>
                        <div className="option" onClick={() => handleDeleteClick(video)}>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="description">{video.description}</div>
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