import React from 'react'

import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import { useState } from 'react'
import Modal from '../components/Modal'
import PostModal from '../components/PostModal'
import EditPostModal from '../components/EditPostModal'


// 전체 게시글 페이지
function Board() {
  const [modal, setModal] = useState(false)
  
  return (
     <>
        <Sidebar setModal={setModal} />

        {/* 중앙 post 영역 */}
        <InnerContainer>
          <InnerMainContainer>
            <PostContainer>
              <Post />
            </PostContainer>
          </InnerMainContainer>
        </InnerContainer>


      <div>
        {
          modal && <Modal setModal={setModal}/>
          
        }
        </div>
    </>
  )
}
export default Board


const InnerContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  background:var(--btncolor);
  color:var(--font-color);
`
const InnerMainContainer = styled.div`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`
const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`
