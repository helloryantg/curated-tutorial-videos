import React, { useEffect, useState } from "react"
import "./ListPage.scss"
import videoListActions from "../../actions/videoList.action"
import { connect } from "react-redux"
import ReactPlayer from "react-player"
import { FiMoreVertical } from "react-icons/fi"
import videoActions from "../../actions/video.action"
import { Link } from "react-router-dom"
import { IoIosAddCircleOutline, IoIosSettings } from "react-icons/io"

const EMPTY_DESCRIPTION = "No description..."

function ListPage(props) {
  const { dispatch, match, videos, videoList, searchText } = props

  const { listId } = match.params

  const [currentVideos, setCurrentVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState({})
  const [displayMenuId, setDisplayMenuId] = useState("")
  const [options, setOptions] = useState({})
  const [editVideo, setEditVideo] = useState({})
  const [editDescription, setEditDescription] = useState("")
  const [editTitle, setEditTitle] = useState("")

  useEffect(() => {
    dispatch(videoListActions.getVideoList(listId))
    dispatch(videoListActions.getVideoListVideos(listId))
  }, [])

  useEffect(() => {
    setCurrentVideos(videos)
  }, [videos])

  useEffect(() => {
    setCurrentVideo(videoList)
  }, [videoList])

  useEffect(() => {
    if (searchText === "") {
      setCurrentVideos(videos)
    } else {
      const filteredVideos = currentVideos.filter((video) =>
        video.title.toLowerCase().includes(searchText.toLowerCase())
      )
      setCurrentVideos(filteredVideos)
    }
  }, [searchText])

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  })

  // Test list page - http://localhost:3000/list/5e66c35fc0055d7503f48f2e
  // Longer test http://localhost:3000/list/5e6411e05d938c317b873924

  const handleOptionsClick = (videoId) => {
    displayMenuId === videoId ? setDisplayMenuId("") : setDisplayMenuId(videoId)
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopImmediatePropagation()

    if (options === null) return

    if (options.toString().includes(e.target.toString())) {
      setDisplayMenuId("")
      setOptions({})
    }
  }

  const handleEditClick = (video) => {
    setEditVideo(editVideo[video._id] ? {} : { [video._id]: video })
    setEditDescription(video.description)
    setEditTitle(video.title)

    if (Object.keys(editVideo).length) {
      let hasChanges = false

      if (editVideo[video._id].description !== editDescription) {
        video.description = editDescription
        hasChanges = true
      }

      if (editVideo[video._id].title !== editTitle) {
        video.title = editTitle
        hasChanges = true
      }

      if (hasChanges) {
        dispatch(videoActions.editVideo(video))
      }
    }
  }

  const handleEnterClick = ({ key, shiftKey }, video) => {
    // if (key !== 'Enter') {
    //   return
    // }
    // video['description'] = editDescription
    // video['title'] = editTitle
    // if (shiftKey) {
    //   dispatch(videoActions.editVideo(video))
    // }
  }

  const handleDeleteClick = (video) => {
    console.log("delete video")
  }

  const handleAddVideoClick = () => {
    console.log('add video click')

    // TODO
  }

  const handleSettingsClick = () => {
    console.log('settings click')

    // TODO
  }

  return (
    <div className="ListPage">
      <div className="header">
        <div className="add">
          <IoIosAddCircleOutline 
            onClick={() => handleAddVideoClick()}
          />
        </div>
        <h2>{currentVideo.name}</h2>
        <div className="settings">
          <IoIosSettings 
            onClick={() => handleSettingsClick()}
          />
        </div>
      </div>
      {currentVideos.map((video, idx) => {
        return (
          <div className="video-container" key={video._id}>
            <div className="video">
              <ReactPlayer
                url={video.url}
                light={true}
                height={"100%"}
                width={"100%"}
              />
            </div>

            <div className="text-container">
              <div className="top">
                <div className="title">
                  {editVideo[video._id] ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(evt) => setEditTitle(evt.target.value)}
                      autoFocus
                      onKeyDown={(evt) => handleEnterClick(evt, video)}
                    />
                  ) : (
                    <Link to={`/video/${video._id}`}>{video.title}</Link>
                  )}
                </div>
                <div className="right" ref={(node) => setOptions(node)}>
                  <FiMoreVertical
                    title="options"
                    onClick={() => handleOptionsClick(video._id)}
                  />
                  <div
                    className={`hidden-options ${
                      displayMenuId === video._id ? "visible" : ""
                    }`}
                  >
                    <div className="options">
                      <div
                        className="option"
                        onClick={() => handleEditClick(video)}
                      >
                        Edit
                      </div>
                      <div
                        className="option"
                        onClick={() => handleDeleteClick(video)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description">
                {editVideo[video._id] ? (
                  <textarea
                    name="description"
                    id="description"
                    value={editDescription}
                    onChange={(evt) => setEditDescription(evt.target.value)}
                    onKeyDown={(evt) => handleEnterClick(evt, video)}
                  ></textarea>
                ) : video.description !== "" ? (
                  <span>{video.description}</span>
                ) : (
                  <span className="empty-description">{EMPTY_DESCRIPTION}</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapState = ({ reducers: { videos, videoList, searchText } }) => ({
  videos,
  videoList,
  searchText,
})

export default connect(mapState)(ListPage)
