import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import user from '../img/user.webp'
import cmt from '../img/comment.png'
import post from '../img/post.png'
import save from '../img/save.png'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query'
import { addComment, deletePost, getPost } from '../api/crud'
import { token } from '../api/crud'
import jwtDecode from 'jwt-decode'
import PostModal from './PostModal'
import EditPostModal from './EditPostModal'
import { Link, useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import instance from '../api/instance/instance'
import LikeCountAcction from '../components/LikeCountAction';
import FollowContents from '../components/FollowContents';



function Post() {

    
    const [showComment, setShowComment] = useState(false)
    
    const [comment, setComment] = useState([]);
    const [contents, setContents] = useState("")
    const [useName, setUserName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [id, setId] = useState(0)
    const [postModal, setPostModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false)
    const {ref, inView} = useInView();
   
    
    const showPostModal = () => {
        setPostModal(true)
    }
    
     const showEditPostModal = () => {
        setEditPostModal(true)
    }

    const onComment = (newComment) => {
        setComment(newComment)
    }
    const onContents = (newContents) => {
        setContents(newContents)
    }
    const onUserName = (newName) => {
        setUserName(newName)
    }
    const onUrl = (newUrl) => {
        setImgUrl(newUrl)
    }
    const onId = (newId) => {
        setId(newId)
    }

    // const { isLoading, isError, data, error, hasNextPage} = useInfiniteQuery(
    //     ['post'], 
    //     getPost,
    //     {
    //         getNextPageParam :(_lastPage, pages) => {
    //             if(pages.length < 4){
    //                 return pages.length + 1
    //             }else{
    //                 return undefined
    //             }
    //         },
    //     }
        
    // )
    
    const { isLoading, isError, data } = useQuery(['post'], getPost)



    const queryClient = useQueryClient();

    const deletePostMutation = useMutation(deletePost, {
        onSuccess : () => {
            queryClient.invalidateQueries('post')
        }
    })


    if (isLoading) {
        return <h1>로딩중...</h1>
    }
    if (isError) {
        return <h1>Error...</h1>
    }
    console.log(data.data)
    


    const onDeletePostHandler = (postId) => {
        alert("정말로 삭제하시겠습니까?")
        deletePostMutation.mutate(postId)
    }
  
   
    const decode_token = jwtDecode(token)
    return (
        <>
            
                {
                    data.data.map((item,i) => (
                       
                        <Container key = {item.id} >
                            
                            <UserInfo>

                                <img src={user} alt='유저' />
                                <UserInfoText>{item.username}</UserInfoText>
                                {
                                    decode_token.sub === item.username ? <button onClick={() => {onDeletePostHandler(item.id)}}>삭제</button> : null
                                }
                                <FollowContents />
                                {
                                    decode_token.sub === item.username ? <EditPost><Link to={`/editpost/${item.id}`}>수정</Link></EditPost> : null
                                }
                                
                            </UserInfo>
                            <PostContent>
                                <img
                                    src={item.imageUrl}
                                    alt='이미지'
                                />
                            </PostContent>
                            <PostCommentContainer>
                                <PostCommentButton>
                                    {/* <img src={like} alt="좋아요" /> */}
                                    <LikeCountAcction />
                                    <img src={cmt} alt="댓글 보기" onClick={() => {
                                        onId(item.id)
                                        onComment(item.comments);
                                        onContents(item.contents)
                                        onUserName(item.username)
                                        onUrl(item.imageUrl)
                                        showPostModal()
                                    }} />
                                    <img src={post} alt="공유" />
                                    <img src={save} alt="저장" />
                                </PostCommentButton>
                                <PostDescription showComment={showComment}>
                                    <h5>
                                        {item.contents}
                                    </h5>

                                    <div className='description_button'>
                                    <span onClick={() => {
                                        onComment(item.comments);
                                        onContents(item.contents)
                                        onUserName(item.username)
                                        onUrl(item.imageUrl)
                                        showPostModal()
                                    }}>상세보기</span>
                                        <p onClick={() => setShowComment(!showComment)}>더 보기</p>
                                    </div>
                                </PostDescription>
                                <CommentInput>
                                    <form>
                                        
                                        <Link to={`/board/${item.id}`}>댓글 달기</Link>
                                    </form>
                                </CommentInput>
                            </PostCommentContainer>
                            
                            <div>
       
        {/* {
          editPostModal && <EditPostModal setEditPostModal={setEditPostModal} post={item}/> 
        } */}
        </div>
                        </Container>
                        
                    ))
                }
        {
            postModal && <PostModal setPostModal={setPostModal} comment={comment} contents={contents} useName={useName} imgUrl={imgUrl} id={id}/> 
        }
        </>
    )
}

export default Post

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
        margin-left: 18px;
        cursor: pointer;
        color: #18a4f8;
`
const PostContent = styled.div`
    width: 100%;
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
        margin-left:35px;
        margin-right:-10px;
        cursor: pointer;
        &:last-child{
            margin-left: 455px;
        }
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
        margin-left:15px;
        color: gray;
        p{
        margin-right:10px;
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
    margin-left:13px;
    input{
        flex: 0.9;
        height: 30px;
        border: none;
        margin-left:10px;
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

