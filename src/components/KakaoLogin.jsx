import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SiKakaotalk } from "react-icons/si";

const  KakaoLogin = () => {
    const REST_API_KEY = "ddc603749d78abff3f309e771a37719f";
    const REDIRECT_URI = "http://localhost:3000/board";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const KakaoLoginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    const location = useLocation();
    const KAKAO_CODE= location.search.split('=')[1];
    const navigate = useNavigate();
    const IP = "http://localhost:3000"

    const getKakaoToken = () => {
      fetch(`https://kauth.kakao.com/oauth/token`,{
        method: 'POST',
        headers: { 'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'},
        body : `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_url=${REDIRECT_URI}&code=${KAKAO_CODE}`,
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.access_token){
          localStorage.setItem('token', data.access_token);
        } else{
            navigate('/');
          }
      });
    }

    
    useEffect(()=>{
      if(!location.search) return;
      getKakaoToken();
    },[]);

    useEffect(()=>{
      fetch(`http://${IP}/api/user/kakao/callback&redirect?code=${KAKAO_CODE}`, {
        method:"GET",
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        // navigate('/board');
      });
    }, []);



  return (
    <>
      <Btn onClick={KakaoLoginHandler}><SiKakaotalk size="22" />&nbsp; 카카오톡으로 로그인</Btn>
    </>
  )
}



export default KakaoLogin


const Btn = styled.button `
   display:flex;
   font-weight:bold;
   color:#385085;
`
