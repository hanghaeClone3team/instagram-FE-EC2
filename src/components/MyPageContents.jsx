import React, { useState } from 'react';
import styled from 'styled-components';
import profile from '../img/profile.png';
import { IoMdSettings } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import { BiCamera } from "react-icons/bi";

const MyPageContents = () => {
    const [tab, setTab] = useState(0);

    const tabArr = [
        {
            name:(
                <Li> 게시물 </Li>
            ),
            content:(
                <Con1>
                    <BiCamera size="50"/>
                    <H3>사진공유</H3>
                    <Ment>사진을 공유하면 회원님의 프로필에 표시됩니다.</Ment>
                    <ShareBtn>첫 사진 공유하기</ShareBtn>
                </Con1>
            )
        },
        {
            name:(
                <Li> 저장됨 </Li>
            ),
            content:(
                <div></div>
            )
        },
        {
            name:(
                <Li> 태그됨 </Li>
            ),
            content:(
                <div></div>
            )
        }
    ];

    const selectTabHandler = (index) => {
        setTab(index);
    };
    
  return (
     <Wrap>
        <Sidebar />
        <Top>
            <ProfileImg src={profile}></ProfileImg>
            <My1>
                <ID>ID</ID>
                <EditBtn>프로필 편집</EditBtn>
                <IoMdSettings size="30"/>
            </My1>

            <My2>
                게시물 &nbsp;<P1>0</P1>
                팔로워 &nbsp;<P2>10</P2>
                팔로우 &nbsp;<P3>20</P3>
            </My2>
        </Top>
        <hr style={{ width:"50%", background:"#c7c7c7",height:"1px",  border:"0" , marginTop:"270px"}}/>
        <Contents>
             {tabArr.map((el,index) => (
              <li className={index === tab ? "submenu focused" : "submenu" }
              onClick={() => selectTabHandler(index)}>{el.name}</li>
            ))}
        <Desc>
              <p>{tabArr[tab].content}</p>
        </Desc>
        </Contents>
     </Wrap>
  )
}

export default MyPageContents


const Wrap = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background:var(--btncolor);
    color:var(--font-color);
`


const Top = styled.div`
    width:100%;
    position:relative;
    top:80px; 
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const ProfileImg = styled.img`
    position:absolute;
    top:-10px; left:35%;
    width:150px;
`


const My1 = styled.div`
    width:300px;
    display:flex;
    position:absolute;
    top:25px; right:40%;
`

const ID = styled.p`
    font-size:1.6rem;
    margin-right:30px;
`

const EditBtn = styled.button`
    width:100px; height:40px;
    background:#ededed;
    border-radius:10px;
    font-weight:bold;
    margin-right:30px;
    color:black;
`

const My2 = styled.div`
    width:300px;
    display:flex;
    position:absolute;
    top:60px; right:40%;
    margin-top:30px;
    font-size:1.1rem;

`

const P1 = styled.p`
   font-weight:bold;
   margin-right:30px;
`

const P2 = styled.p`
    font-weight:bold;
    margin-right:30px;
`

const P3 = styled.p`
    font-weight:bold;
    margin-right:30px;
`

const Contents = styled.div`
    position:relative;
    top:0; 
    width:80%;
    display: flex;
    flex-direction: row;
    align-items: center;  
    cursor:pointer;
    margin-bottom: 7rem;
    justify-content: center;

    .submenu {
          display: flex;
          width:60px;
          padding-top:15px;
          padding-left:15px;
          margin-right:50px;
          font-size: 17px;

        }

        .focused {
             color: rgb(21,20,20);
             font-weight:bold;
             border-top:2px solid black;
             width:70px;
             padding-right:10px;
           }
         
           & div.desc {
             width:100px;
             background:red;
             text-align: center;
           }
`

const Desc = styled.div`
    text-align:center;
`

const Li = styled.li `
    list-style:none;
`

const Con1 = styled.div `
    position:relative;
    top:200px;
    width:100%;
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const H3 = styled.h3 `
    font-size:2rem;
    font-weight:bold;
    margin-top:10px;
    margin-bottom:20px;
`

const Ment = styled.p `
    margin-bottom:30px;
`

const ShareBtn = styled.button `
    color:#0095f6;
    font-weight:bold;
`


