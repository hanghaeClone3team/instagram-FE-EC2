import React from 'react'
import '../css/comment.css'
import profile from '../img/profile.png'

function Comment(props) {
  console.log(props)
  return (
    <div className='comment-container'>
      <img className='profile-image' src={profile} alt="프로필" />
      <div>
        <div>
          <span className='username'>User {props.comment.comment_id}</span>
          <span>{props.comment.comments}</span>
        </div>
        <div className='comment-detail'>
          <span>좋아요</span>
          <span>Reply</span>
        </div>
      </div>
    </div>
  )
}

export default Comment