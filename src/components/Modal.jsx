import React, { useState, useRef } from 'react'
import instafile from '../img/insta_file.PNG'
import styled from 'styled-components'
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../api/crud';


function Modal(props) {

  const [input, setInput] = useState({ content: "" })
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(false);
  const imgRef = useRef();
  const queryClient = useQueryClient();

  const addMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const closeModal = () => {
    props.setModal(false)
  }

  const contentsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeImage = () => {
    const reader = new FileReader();

    const file = imgRef.current.files[0];
    console.log("file", file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
  };
  // const addDormBoard = (e) => {
  //   e.preventDefault();
  //   addMutation.mutate({
  //     title,
  //     contents,
  //     dormitory : userDormitory
  //   })
  //   alert('작성이 완료되었습니다.')
  //   navigate(`/${userDormitory}`)
  // }
  
  // const postRequestDto = {"content" : input.content}
  const body = {
    content:input.content
  }
  const newPostContent = new Blob([JSON.stringify(body)], {
    type: "application/json"
  })
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", imgFile)
    data.append("postRequestDto", newPostContent)
    console.log("이미지 : ", data.get("image"), "본문 내용 :", data.get("postRequestDto"))
    addMutation.mutate(data)
    props.setModal(false);
  }

  return (
    <ModalBackground onClick={closeModal}>
      <ModalPostOut onClick={closeModal}>X</ModalPostOut>
      <ModalPostMake onClick={(e) => e.stopPropagation()}>
        <ModalPostBoxContainer>
          <ModalPostBoxOne>
            <ModalPostBoxOneLabel>
              <ModalPostBoxOneLabelName>
                {/* 게시물  */}
                <span>새 게시물 만들기</span>
              </ModalPostBoxOneLabelName>
            </ModalPostBoxOneLabel>

            {/* 이미지 집어넣기 영역 */}
            {
              imageUrl ? <ModalPostImg src={imageUrl}></ModalPostImg> : null
            }

            
              <ModalPostImgBox
                id='imgfile'
                type="file"
                accept='image/*'
                onChange={onChangeImage}
                ref={imgRef}
              />


              {
                percent ?
                  (
                    <ModalPostBoxTwoLabel>{file.name}</ModalPostBoxTwoLabel>
                  )
                  :
                  (
                    <ModalPostBoxTwoLabel>사진을 선택하세요!</ModalPostBoxTwoLabel>
                  )
              }

              <SelectImgButton onClick={() => imgRef.current.click()}>
                컴퓨터에서 선택
              </SelectImgButton>

          </ModalPostBoxOne>
        
        <ModalPostBoxTwo>
          
          <PostUpload>

            <PostButton onClick={onSubmit}>공유하기</PostButton>

          </PostUpload>

          
          <PostTextArea
            name='content'
            value={input.content}
            onChange={contentsChangeHandler}
            placeholder="내용을 입력하세요"
          ></PostTextArea>
        
        </ModalPostBoxTwo>
      </ModalPostBoxContainer>
    </ModalPostMake>
    </ModalBackground >
  )
}

export default Modal

const ModalBackground = styled.div`
    position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.185);
  z-index: 0;
`
const ModalPostOut = styled.div`
    position: absolute;
  right: 50px;
  top: 30px;
  background-color: transparent;
  color: white;
  font-size: 50px;
  border: transparent;
`
// 모달 화면
// 스타일 조절하려면 이 컴포넌트 조절
const ModalPostMake = styled.div`
    width: 1200px;
    height: 1000px;

    // 모달창 최상단 위치 지정
    z-index: 999;
    position: absolute;
    top: 10%;
    left: 30%;
    
    
    border: 0 solid transparent;
    border-radius: 15%;
`
const ModalPostBoxContainer = styled.div`
    width: 1200px;
  height: 1000px;
  display: flex;
  justify-content: center;
`
const ModalPostBoxOne = styled.div`
    background-color: white;
  border: 1px solid #bababa;
  border-radius: 15px;
  width: 600px;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(${instafile});
  background-repeat: no-repeat;
  background-position: center;
`
const ModalPostBoxOneLabel = styled.div`
     margin-top: 10px;
  width: 90%;
  height: 30px;
  border-bottom: solid 1px #bababa;
  position: absolute;
  top: 0;
`
const ModalPostBoxOneLabelName = styled.div`
    width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ModalPostImg = styled.img`
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
  &:hover {
    transform: scale(1.05, 1.05); /* 가로2배 새로 1.5배 로 커짐 */
    transition: transform 0.5s; /* 커지는 시간 */
  }

`

const ModalPostImgBox = styled.input`
  display: none;
`

const ModalPostBoxTwoLabel = styled.div`
    margin-top: 180px;
  margin-bottom: 20px;
`
const SelectImgButton = styled.button`
    background: #0095f6;
  border: none;
  color: white;
  font-size: 13px;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`

const ModalPostBoxTwo = styled.div`
  width: 400px;
  height: 1000px;
  border: 1px solid #bababa;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostUpload = styled.div`
  width: 80%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  
  justify-content: right;
  border-bottom: 1px solid #bababa;
`

const PostButton = styled.button`
  width: 50%;
  height: 30px;
  border: none;
  font-weight: 600;
  font-size: 18px;
  background: white;
  border: none;
  color: #0095f6;
  cursor: pointer;
`

const PostTextArea = styled.textarea`
  width: 90%;
  border: none;
  height: 400px;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
  &:focus {
    outline: none;
  }
  resize: none;
  font-weight: 600;
`