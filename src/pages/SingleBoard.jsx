
import React, { useState } from 'react'
import styled from 'styled-components'
import user from '../img/user.webp'
import like from '../img/like.png'
import cmt from '../img/comment.png'
import post from '../img/post.png'
import save from '../img/save.png'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addComment, deleteComment, deletePost, getPost, getSinglePost } from '../api/crud'
import { token } from '../api/crud'
import jwtDecode from 'jwt-decode'
// import PostModal from './PostModal'
// import EditPostModal from './EditPostModal'
import { Link, useParams } from 'react-router-dom'


import Sidebar from '../components/Sidebar'



function SingleBoard() {


    const params = useParams()
    console.log(params)
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState("");
    const [postId, setPostId] = useState(0)
    const [postModal, setPostModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false)
    
    const showPostModal = () => {
        setPostModal(true)
    }
    const showEditPostModal = () => {
        setEditPostModal(true)
    }

    const onCommentHandler = (e) => {
        setComment(e.target.value)
    }
    // () => getSinglePost(params.id)
    const { isLoading, isError, data } = useQuery(['post'],  () => getSinglePost(params.id))
    const queryClient = useQueryClient();

    const deletePostMutation = useMutation(deletePost, {
        onSuccess : () => {
            queryClient.invalidateQueries('post')
        }
    })

    const addCommentMutation = useMutation(addComment, {
        onSuccess : () => {
            queryClient.invalidateQueries('post')
        }
    })
    const deleteCommentMutation = useMutation(deleteComment, {
      onSuccess:() => {
        queryClient.invalidateQueries('post')
      }
    })
    if (isLoading) {
        return <h1>로딩중...</h1>
    }
    if (isError) {
        return <h1>Error...</h1>
    }
    
    const decode_token = jwtDecode(token)


    const onDeletePostHandler = (postId) => {
        alert("정말로 삭제하시겠습니까?")
        deletePostMutation.mutate(postId)
    }
    const onAddCommentHanlder = (e) => {
        e.preventDefault()
        
        addCommentMutation.mutate({
            postId : data.data.id,
            newComment : comment
        })
        setComment("")
    }
    const onDeleteCommentHandler = (id) => {
      console.log(id)
      deleteCommentMutation.mutate(id)
    }
    console.log(data.data)
    return (
        <>
            
                
                    
                        <Container key = {data.data.id}>
                            <UserInfo>

                                <img src={user} alt='유저' />
                                <UserInfoText>{data.data.username}</UserInfoText>
                                {
                                    decode_token.sub === data.data.username ? <button onClick={() => {onDeletePostHandler(data.data.id)}}>삭제</button> : null
                                }
                                {
                                    decode_token.sub === data.data.username ? <EditPost><Link to={`/editpost/${data.data.id}`}>수정</Link></EditPost> : null
                                }
                                
                            </UserInfo>
                            <PostContent>
                                <img
                                    src={data.data.imageUrl}
                                    alt='이미지'
                                />
                            </PostContent>
                            <PostCommentContainer>
                                <PostCommentButton>
                                    <img src={like} alt="좋아요" />
                                    <img src={cmt} alt="댓글 보기" onClick={showPostModal} />
                                    <img src={post} alt="공유" />
                                    <img src={save} alt="저장" />
                                </PostCommentButton>
                                <LikeCount>
                                    <p>좋아요 100개</p>
                                </LikeCount>
                                <PostDescription showComment={showComment}>
                                    <h5>
                                        {data.data.contents}
                                    </h5>

                                    <div className='description_button'>
                                        <span onClick={showPostModal}>댓글 ~개 모두 보기</span>
                                        <p onClick={() => setShowComment(!showComment)}>더 보기</p>
                                    </div>
                                </PostDescription>
                                <CommentInput>
                                    <form onSubmit={onAddCommentHanlder}>
                                        <input type="text" placeholder='댓글 달기...' value={comment} onChange={onCommentHandler}/>
                                        {
                                            comment ? <button type='submit'>게시</button> : null
                                        }
                                        
                                    </form>
                                </CommentInput>
                            </PostCommentContainer>
                            <div>
        {/* {
            postModal && <PostModal setPostModal={setPostModal} post={item}/> 
        }
        {
          editPostModal && <EditPostModal setEditPostModal={setEditPostModal} post={item}/> 
        } */}
        {
          data.data.comments.map((item) => (
            <div key={item.comment_id}>
              <p>{item.comments}</p>
              <button onClick={() => {onDeleteCommentHandler({boardId:params.id, commentId:item.comment_id})}}>삭제</button>
            </div>
          ))
        }
        </div>
                        </Container>
                        
                
        </>
    )

}

export default SingleBoard

const HideInput = styled.input`
    display:none;
`
const Container = styled.div`
    height: fit-content;
    width: 100%;
    border-top: 1px solid lightgray;
    background-color: #fff;
    margin-top: 20px;
`

const UserInfo = styled.div`
    height: 60px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    img{
        width: 38px;
        height: 38px;
        border-radius: 100%;
        margin-left: 10px;
        border: 1px solid lightgray;
    }
    
    
`
const UserInfoText = styled.p`
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        margin-left: 10px;
`

const EditPost = styled.p`
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        margin-left: 50px;
        cursor: pointer;
        color: #18a4f8;
`
const PostContent = styled.div`
    width: 25%;
    display: flex;
    border-bottom: 1px solid lightgray;
    img{
        width: 100%;
    }

`
const PostCommentContainer = styled.div`
    width: 100%;
    margin: auto;


`
const PostCommentButton = styled.div`

    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 4px;

    img{
        width: 24px;
        height: 22px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        &:last-child{
            margin-left: 450px;
        }
    }
    

`
const LikeCount = styled.div`
    p{
        margin-left: 10px;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
    }
`
const PostDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    h5{
        font: 14px;
        line-height: 20px;
        border: none;
        width: 100%;
        height: ${(props) => props.showComment ? 'fit-content' : '40px'};
        overflow: hidden;
        min-height: 40px;
        font-weight: 500;
        
    }
    .description_button{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: gray;
        p{
      
      cursor: pointer;
  }
    }
    
`


const CommentInput = styled.div`
    padding: 10px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input{
        flex: 0.9;
        height: 30px;
        border: none;
        margin-right: 10px;
        outline: none;
    }
    button{
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 15px;
        color: #18a4f8;
        cursor: pointer;
        margin-left: 380px;
    }
`

