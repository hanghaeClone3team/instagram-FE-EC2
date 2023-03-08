import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { IoMdSettings } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";
import { CgSoftwareDownload } from "react-icons/cg";
import { RiFeedbackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import useLogout from "../hooks/useLogout";
import { useDarkMode } from './context/DarkModeContext';
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Menubar = () => {
  const navigate = useNavigate();

    const [logout] = useLogout();

    const onClickLogout = () => {
        logout();
        window.location.replace('/');
    }
  
  const [isOpen2, setIsOpen2] = useState(false);

    const openModalHandler2 = () => {
      setIsOpen2(!isOpen2);
    };

    const outSection = useRef();
    const { darkMode, toggleDarkMode } = useDarkMode();

  return (
      <>
        <ModalBtn2 onClick={openModalHandler2}>
            <i className="uil uil-bars"> </i> &nbsp; &nbsp; 
            {isOpen2 ? "더 보기" : "더 보기"}
        </ModalBtn2>
        {
          isOpen2 === true
          ? (<ModalBackGround2 ref={outSection} onClick={(e)=>{
            if(outSection.current === e.target) {
              setIsOpen2(false)
            }
        }}>
      
          <ModalDiv>
            <Btn1>설정<IoMdSettings size="25"/></Btn1>  <hr style={{ width:"230px", background:"#c7c7c7",height:"0.5px",  border:"0" , marginTop:"-20px"}}/>
            <Btn2>내 활동<RiHistoryLine size="25"/></Btn2> <hr style={{ width:"230px", background:"#c7c7c7",height:"0.5px",  border:"0" , marginTop:"-20px"}}/>
            <Btn3>저장됨<CgSoftwareDownload size="25"/></Btn3> <hr style={{ width:"230px", background:"#c7c7c7",height:"0.5px",  border:"0" , marginTop:"-20px"}}/>
            <Btn4 onClick={toggleDarkMode}>
              모드 전환
              {!darkMode && <BsMoonFill />}
              {darkMode && <BsSunFill />}
            </Btn4>
            <hr style={{ width:"230px", background:"#c7c7c7",height:"0.5px",  border:"0" , marginTop:"-20px"}}/>
            <Btn5>문제 신고<RiFeedbackLine size="23" /></Btn5>
            <Btn6>계정 전환</Btn6> <hr style={{ width:"230px", background:"#c7c7c7",height:"0.5px",  border:"0" , marginTop:"-20px"}}/>
            <Btn7 onClick={()=>{onClickLogout()}}>로그아웃</Btn7> 
          </ModalDiv>
          </ModalBackGround2>) : null
        }      
     </>
  )
}

export default Menubar


const ModalBtn2 = styled.button`
  display: flex;
  align-items: center;
  position:relative;
  left:5px;
  width:200px;
`

const ModalBackGround2 = styled.div`
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  z-index:10;
`

const ModalDiv = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position:fixed;
  bottom:100px; left:50px;
  width:260px; height:410px;
  background:var(--btncolor);
  color:var(--font-color);
  border-radius:10px;
  box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
  -webkit-box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
  -moz-box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
  padding:20px;
`

const Btn1 = styled.button`
  width:90%;
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-top:-80px;
`


const Btn2 = styled.button`
  width:90%; 
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-top:20px;
`


const Btn3 = styled.button`
  width:90%;
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-top:20px;
`


const Btn4 = styled.button`
  width:90%;
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-top:20px;
`


const Btn5 = styled.button`
  width:90%;
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-top:20px;
`


const Btn6 = styled.button`
  position:absolute;
  left:33px; bottom:45px; 
`

const Btn7 = styled.button`
  position:absolute;
  left:33px; bottom:0;
`
