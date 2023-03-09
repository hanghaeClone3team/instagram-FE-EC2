import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { addComment } from '../api/crud'
import '../css/postmodal.css'
import profile from '../img/profile.png'
import dot from '../img/dots.png'
import Comment from './Comment'
import LikeCountAcction from '../components/LikeCountAction';
import cmt from '../img/comment.png'
import post from '../img/post.png'
import save from '../img/save.png'


// 게시글 상세 페이지 모달로 띄우기
function PostModal(props) {
    
    console.log(props)

    const closePostModal = () => {
        props.setPostModal(false)
    }
    const [newComment, setNewComment] = useState("");
    
    const onCommentHandler = (e) => {
        setNewComment(e.target.value)
    }
    const queryClient = useQueryClient()
    const addCommentMutation = useMutation(addComment, {
        onSuccess : () => {
            queryClient.invalidateQueries('post')
        }
    })
    const onAddCommentHandler = (e) => {
        e.preventDefault();
        addCommentMutation.mutate({
            postId:props.id,
            newComment:newComment
        })
    }
    return (
      <div className='modal-container' >
      <div className='close-modal' onClick={closePostModal}>X</div>
      <div className='modal'>
        <img className='modal-image' src ={props.imgUrl}  alt='이미지'/>
        <div className='modal-content-section' >
          <div className='modal-top-section modal-section'>
            <img  className='profile-image' src={profile} alt='이미지'/>
            <div className='username'>{props.useName}</div>
            <div className='spacer'></div>
            <div className='dot'><img className='dot-image' src={dot} alt="dot"/></div>
          </div>
          <div className='modal-comment-section modal-section'>
            <div className='comment-container'>
              <img className='profile-image' src={profile} alt="프로필" />
              <div>
                <div>
                  <span className='username'>{props.useName}</span>
                  <span>{props.contents}</span>
                </div>
              </div>
             </div>
            {
              props.comment.map((item) => (
               <Comment key={item.comment_id} comment={item}/>
              ))
            }
          </div>
          <div className='modal-detail-section modal-section'>
            <div className='detail-actions'>
              <LikeCountAcction/>
              <img src={cmt} alt="댓글 보기"  />
              <img src={post} alt="공유" />           
              <div className='spacer'></div>
              <img src={save} alt="저장" />
            </div>
          </div>
          <div className='write-section modal-section'>
           <textarea type="text" placeholder='댓글을 입력하세요' value={newComment} onChange={onCommentHandler}></textarea>
           <button onClick={onAddCommentHandler}>댓글 달기</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default PostModal

