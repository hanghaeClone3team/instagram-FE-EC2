import axios from "axios";
import instance from './instance/instance';
import { Cookies } from "react-cookie";



// export const getPost = async ({pageParam = 1}) => {
//     const response = await instance.get(`/api/post?_limit=2@_page${pageParam}`)
//     return response
// }



// 인스타 post 가져오기
export const getPost = async () => {
    const response = await instance.get(`/api/post`)
    return response
}



// 인스타 post 추가
export const addPost = async (newPost) => {
    console.log(newPost)
    console.log(token)
    await instance.post(`/api/post`, newPost , {
        headers : {
            'Content-Type' : 'multipart/form-data',
            Authorization : token
        }
    })
}

// 인스타 post 삭제

export const deletePost = async (postId) => {
    await instance.delete(`/api/post/${postId}`)
}

// 인스타 post 내용 수정

export const editPost = async ({postId, postRequestDto}) => {
    console.log("수정내용 ", postRequestDto)
    await instance.patch(`/api/post/${postId}`, postRequestDto,
    {
        headers : {
            "Content-Type":"application/json",
            Authorization : token
        }
    }    )
}

// 인스타 post 좋아요

export const likePost = async (postId) => {
    await instance.post(`/api/post/${postId}`)
}

// 상세 게시글 가져오기
export const getSinglePost = async (paramId) => {
    const response = await instance.get(`api/post/${paramId}`)
    return response
}
// 인스타 댓글 달기

export const addComment = async ({postId, newComment}) => {
    console.log(postId, newComment)
    await instance.post(`/api/post/${postId}/comment`, {
        comments:newComment
    })
}

// 인스타 댓글 삭제

export const deleteComment = async (id) => {
    console.log(id)
    await instance.delete(`/api/post/${id.boardId}/comment/${id.commentId}`)
}

const cookie = new Cookies();
export const token = cookie.get('authorization');
console.log(token)
