import React, { useState } from 'react';
import { useCookies, Cookies } from 'react-cookie';
import { login } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import KakaoLogin from './KakaoLogin';
import Logo from '../img/logo.svg'
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";

import leftbox from '../img/leftbox.png';
import login1 from '../img/login1.png';
import login2 from '../img/login2.png';
import login3 from '../img/login3.png';
import login4 from '../img/login4.png';
import {motion, AnimatePresence} from 'framer-motion'


const MainLogin = () => {
    const [emailValue , emailValueHandler] = useInput();
    const [pwValue, pwValueHandler] = useInput();
    const [cookies, setCookie] = useCookies(['authorization']);
    const myCookie = new Cookies();
    const isLogin = !!myCookie.get('authorization');


    const navigate = useNavigate();

    const [imgArr, setImgArr] = useState([login1, login2, login3, login4]);
    const [imgIndex, setImgIndex] = useState(0);


    useEffect(()=>{
        if(isLogin) navigate('/board');
    },[])

    const wrongNotify = () => {
        
    }

    const onClickLoginButton = () => {
        if(!emailValue || !pwValue) return;
        login({ email:emailValue, password:pwValue }).then((res)=>{
            const authId = res.headers.authorization;

            setCookie("authorization", authId);

            navigate('/board');
        }).catch((error)=>{
            wrongNotify();
        })
    }

    useEffect(()=>{
        const ref = setInterval(changeImg, 2000);

        return () => clearInterval(ref);
    },[])

    const changeImg = () => {
        setImgIndex((prev) => {
            if(prev >= imgArr.length - 1) return 0;
    
            return prev + 1;
        })
    }


  return (
    <Wrap>
      <Left>
        <Phone>
            <PhoneImg src={leftbox} alt="phone" />
            <AnimatePresence>            
                {imgArr.map((v, i) => imgIndex === i && <PhoneContentImg variants={imgVariants} initial="from" animate="to" exit="exit" src={v} key={i}/>)} 
            </AnimatePresence>
        </Phone>
      </Left>

      <Right>
        <LoginBox>
            <img src={Logo} alt="instagram" style={{ width:"50%", marginBottom:"40px" , marginTop:"40px" , cursor:"pointer"}}/>
            <IdInput type="text" value={emailValue || ""} onChange={(e)=>{emailValueHandler(e)}} placeholder='사용자 이름 또는 이메일' /> <br />
            <PwInput type="password" value={pwValue || ""} onChange={(e)=>{pwValueHandler(e)}} placeholder='비밀번호'/> <br />
            <LoginBtn onClick={()=>{onClickLoginButton()}}>로그인</LoginBtn>

            <Or>
              <hr style={{ width:"130px", background:"#c7c7c7",height:"1.5px",  border:"0" }}/>
              <p style={{ width:"50px" , textAlign:"center", marginTop:"-10px"}}>또는</p>
              <hr style={{ width:"130px", background:"#c7c7c7",height:"1.5px",  border:"0" }}/>
            </Or>

            <KakaoLogin />
            <P1>비밀번호를 잊으셨나요?</P1>
        </LoginBox>
        
        <RegisterBox>
            계정이 없으신가요? &nbsp;
            <Link to="/register" style={{ textDecoration: "none" }}>
                <RegisterBtn>가입하기</RegisterBtn>
            </Link> 
        </RegisterBox>
        
        <P2>앱을 다운로드하세요.</P2>
        <Bottom>  
            <AppBtn><AiFillApple size="35"/><P3>App Store에서 <br />다운로드 하기</P3></AppBtn>
            <GoogleBtn><FcGoogle size="30" /><P4>다운로드하기 <br />Google Play</P4></GoogleBtn>
        </Bottom>
      </Right>
    </Wrap>
  )
}

export default MainLogin

const imgVariants = {
    from: {opacity: 0},
    to: {opacity: 1, transition: {duration: 0.5}},
    exit: {opacity: 0, transition: {duration: 0.5}},
}

const Phone = styled.div `
    position:relative;
    top: -335px;
    left: -60px;
    z-index: -1;
    width:480px; 
`

const PhoneImg = styled.img`
    position: absolute;
`

const PhoneContentImg = styled(motion.img)`
    position: absolute;
    width: 260px;
    right: 59px;
    top: 24px;
`

const Wrap = styled.div `
    width:80% ;
    height:1080px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    box-sizing: border-box;
`

const Left = styled.div `
    position:relative;
    width:50%; height:800px;
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left:50%;
    margin-top:180px;
`


const Right = styled.div `
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width:50%; height:800px;
    box-sizing: border-box;
    padding-right:5%;
    margin-top:180px;
`

const LoginBox = styled.div `
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width:390px; height:480px;
    border:1px solid #c7c7c7;
    background:white;
`

const IdInput = styled.input `
    width:300px; height:43px;
    padding-left:1rem;
    border-radius:2px;
    border:1px solid #dfdfdf;
    background:#fafafa;
    margin-bottom:-10px;
    font-size:0.9rem;
`

const PwInput = styled.input `
    width:300px; height:43px;
    padding-left:1rem;
    border-radius:2px;
    border:1px solid #dfdfdf;
    background:#fafafa;
    font-size:0.9rem;
`

const LoginBtn = styled.button `
    width:300px; height:36px;
    background:#67b6fa;
    border:none;
    border-radius:10px;
    color:white;
    font-weight:bold;
    font-size:1rem;
    line-height:35px;
    margin-top:-5px;
    margin-bottom:30px;
    cursor:pointer;
`

const Or = styled.div `
    display:flex;
    width:300px;
    margin-bottom:25px;
`

const P1 = styled.p `
    margin-top:20px;
    font-size:0.9rem;
    color:#385085;
    font-weight:500;
`

const RegisterBox = styled.div `
    display:flex;
    align-items: center;
    justify-content: center;
    width:390px; height:70px;
    border:1px solid #c7c7c7;
    margin-top:10px;
    font-size:0.95rem;
    background:white;
`

const P2 = styled.p `
    margin-top:20px;
    font-size:0.95rem;
`
const RegisterBtn = styled.button `
    cursor:pointer;
    font-weight:bold;
    color:#0095f6;
`

const Bottom = styled.div `
    display:flex;
    margin-top:20px;
`

const AppBtn = styled.button `
    cursor:pointer;
    width:160px; height:50px;
    background:black;
    font-size:0.8rem;
    color:white;
    border-radius:5px;
    margin-right:10px;
    padding:10px;
`

const P3 = styled.p `
  margin-top:-40px;
  margin-left:25px;
`

const P4 = styled.p `
  margin-top:-35px;
  margin-left:25px;
`

const GoogleBtn = styled.button `
    cursor:pointer;
    width:160px; height:50px;
    background:black;
    font-size:0.8rem;
    color:white;
    border-radius:5px;
    padding:10px;
`

