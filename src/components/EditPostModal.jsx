import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components'
import { editPost, getPost } from '../api/crud'
import { token } from '../api/crud'
import jwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'
import useInput from '../hooks/useInput'
import '../css/postmodal.css'
import dot from '../img/dots.png'
import profile from '../img/profile.png'



function EditPostModal() {
    // const clostEditPostModal = () => {
    //     props.setEditPostModal(false)
    // }
    
    // const {isLoading, isError, data} = useQuery(['post'], getPost)
    // if (isLoading) {
    //     return <h1>로딩중...</h1>
    // }
    // if (isError) {
    //     return <h1>Error...</h1>
    // }



    // 백엔드에 있는 데이터값 가져오기

    // 
    const { isLoading, isError, data } = useQuery(['post'], getPost)
    const [contents, setContents] = useState("");
    const queryClient = useQueryClient()
    const params = useParams()
   

    




   
      const editMutation = useMutation(editPost, {
        onSuccess : () => {
            queryClient.invalidateQueries()
        }
      })
    if (isLoading) {
        return <h1>로딩중...</h1>
    }
    if (isError) {
        return <h1>Error...</h1>
    }

    // 특정 id값을 가진 post 가져옴
    const forEditData = data.data.find((element) => String(element.id) === params.id)
    console.log(forEditData)
    
    const body = {
      content:contents
    }
    const newPostContent = new Blob([JSON.stringify(body)], {
      type: "application/json"
    })
      const EditPost = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("postRequestDto", newPostContent)
        editMutation.mutate({
          postId:params.id,
          postRequestDto:body
        })
      }
      
  return (
    <div className='modal-container' >
        <div className='close-modal' >X</div>
        <div className='modal'>
          <img className='modal-image' src ={forEditData.imageUrl}  alt='이미지'/>
          <div className='modal-content-section' >
            <div className='modal-top-section modal-section'>
              <img  className='profile-image' src={profile} alt='이미지'/>
              <div className='username'>{forEditData.username}</div>
              <div className='spacer'></div>
              <div className='dot'><img className='dot-image' src={dot} alt="dot"/></div>
            </div>
            <div className='modal-comment-section modal-section'>
              <div className='comment-container'>
                <img className='profile-image' src={profile} alt="프로필" />
                <div>
                  <div>
                    <span className='username'>{forEditData.username}</span>
                    <span>{forEditData.contents}</span>
                  </div>
                </div>
               </div>
          
            <div className='write-section modal-section'>
             <textarea type="text" placeholder='수정할 내용을 입력하세요' value={contents} onChange={(e) => {setContents(e.target.value)}}></textarea>
             <button onClick={EditPost}>수정하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPostModal

