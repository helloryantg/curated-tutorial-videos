import React, { useEffect, useState } from 'react';
import './ListPage.scss';
import videoListActions from '../../actions/videoList.action';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { FiMoreVertical } from "react-icons/fi";

const EMPTY_DESCRIPTION = 'No description...';

function ListPage(props) {
  const {
    dispatch,
    match,
    videos,
    videoList,
    searchText,
  } = props;

  const {
    listId,
  } = match.params;

  const [currentVideos, setCurrentVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [displayMenuId, setDisplayMenuId] = useState('');
  const [options, setOptions] = useState({});
  const [editVideo, setEditVideo] = useState({});
  const [editDescription, setEditDescription] = useState('');

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
    if (searchText === '') {
      setCurrentVideos(videos);
    } else {
      const filteredVideos = currentVideos.filter(video => video.title.toLowerCase().includes(searchText.toLowerCase()));
      setCurrentVideos(filteredVideos);
    }
  }, [searchText])

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
    setEditVideo(editVideo[video._id] ? {} : { [video._id]: video });
    setEditDescription(video.description);
  }

  const handleDeleteClick = video => {
    console.log('delete video');
  }

  const handleChangeTextarea = event => {
    console.log(event.target.value);
    setEditDescription(event.target.value);
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
                <div className="description">
                  {editVideo[video._id] ?
                    <textarea 
                      name="description" 
                      id="description" 
                      cols="30" 
                      rows="10"
                      value={editDescription}
                      onChange={(evt) => handleChangeTextarea(evt)}
                    ></textarea>
                    : video.description !== '' 
                      ? <span>{video.description}</span>
                      : <span className="empty-description">{EMPTY_DESCRIPTION}</span>}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const mapState = ({ reducers: {
  videos,
  videoList,
  searchText
}}) => ({
  videos,
  videoList,
  searchText,
})

export default connect(mapState)(ListPage);