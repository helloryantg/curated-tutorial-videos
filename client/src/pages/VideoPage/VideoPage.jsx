// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoPage.scss'
// Components
import NavBar from '../../components/NavBar/NavBar'
// Dependencies
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'
// Services
import commentService from '../../services/comment.service'
import videoActions from '../../actions/video.action'
// Utils
import { 
  isEmpty
} from '../../utils/object'
import { 
  isNullOrEmpty 
} from '../../utils/string.utils'
import videoUtils from '../../utils/video.utils'

function VideoPage(props) {
  const {
    comments,
    dispatch,
    user,
    video,
    videoPageUser,
  } = props
  
  const [body, setBody] = useState('')
  const [createdByUser, setCreatedByUser] = useState('')
  const [currentVideo, setCurrentVideo] = useState({})
  const [editComment, setEditComment] = useState({})
  const [videoComments, setVideoComments] = useState([])
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    dispatch(videoActions.getVideo(props.match.params.id))
  }, [dispatch, props.match.params.id])

  useEffect(() => {
    if (!isEmpty(video)) {
      setCurrentVideo(video)
      setVideoId(videoUtils.getVideoIdFromUrl(video.url))
    }
  }, [video])

  useEffect(() => {
    if (comments.length) {
      if (comments.some(comment => comment.parentId === currentVideo._id)) {
        setVideoComments(comments)
      }
    }
  }, [comments, currentVideo])

  useEffect(() => {
    if (videoPageUser) {
      setCreatedByUser(videoPageUser.displayName)
    }
  }, [videoPageUser])

  const createComment = async () => {
    if (!isNullOrEmpty(body)) {
      const newComment = {
        parentId: currentVideo._id,
        body,
        user: user._id,
      }
  
      try {
        const commentId = await commentService.createComment(newComment)
  
        setVideoComments([...videoComments, { ...newComment, user, _id: commentId, createdAt: new Date() }])
      } catch {
        throw new Error('Unable to create comment')
      }
  
      setBody('')      
    }
  }

  const onReady = event => {
    event.target.pauseVideo()
  }

  const opts = {
    // height: '800',
    // width: '800',
    // playerVars: {
    //   autoplay: 1
    // }
  }

  const handleEditComment = async comment => {
    if (comment._id === editComment._id) {
      try {
        commentService.editComment(editComment)
      } catch (err) {
        throw new Error(err)
      }
      
      const commentIndex = videoComments.findIndex(vidComment => vidComment._id === editComment._id)

      if (commentIndex !== -1) {
        setVideoComments(videoComments.splice(commentIndex, 1, editComment))
      } else {
        console.error('Could not find the index of the edited comment')
      }

      setVideoComments(videoComments)
      setEditComment({})
    } else {
      setEditComment(comment)
    }
  }

  const handleDeleteComment = async comment => {
    try {
      await commentService.deleteComment(comment._id)
      
      const commentsList = videoComments.filter(vidComment => vidComment._id !== comment._id)

      setVideoComments(commentsList)
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleCancelComment = comment => {
    setEditComment({})
  }

  return (
    <div className="VideoPage">
      <NavBar />
      <div className="main">
        <div className="video">
          {/* <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
          /> */}
          <ReactPlayer
            url={video.url}
            light={true}
          />
        </div>
        <div className="details">
          <h2 className="title">{video.title}</h2>
          <p className="userName">{createdByUser}</p>
          <p className="description">{video.description}</p>
          <div className="comments">
            {videoComments.map(comment => {
              return <div className="comment" key={comment._id}>
                <div className="body-user">
                  {(editComment && (editComment._id === comment._id))
                    ? <textarea 
                        value={editComment.body}
                        onChange={({ target }) => {
                          setEditComment({ 
                            ...editComment,
                            body: target.value,
                          })
                        }}
                      ></textarea>
                      : <div className="body">({new Date(comment.createdAt).toDateString()}) {comment.body}</div> 
                  }
                  <div className="user">{comment.user.displayName}</div>
                </div>
                {(comment.user._id === user._id) 
                  ? <div className="settings">
                      <div 
                        className="edit"
                        onClick={() => handleEditComment(comment)}
                      >Edit</div>
                      <div 
                        className="delete"
                        onClick={() => handleDeleteComment(comment)}
                      >Delete</div>
                      {!isEmpty(editComment)
                        ? <div 
                            className="cancel"
                            onClick={() => handleCancelComment(comment)}
                          >Cancel</div>
                        : null
                      }
                      
                    </div>
                  : null
                }
              </div>
            })}
          </div>
          <div className="addComment">
            <textarea
              cols="30"
              rows="10"
              onChange={({ target }) => setBody(target.value)}
              value={body}
            ></textarea>
            <button
              onClick={() => createComment()}
            >Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  comments: reducers.comments,
  video: reducers.video,
  videoPageUser: reducers.videoPageUser,
  user: reducers.user,
})

export default connect(mapState)(VideoPage)