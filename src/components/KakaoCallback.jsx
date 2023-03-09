import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const KakaoCallback = () => {
  const { token } = useParams();
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    // 쿠키에 토큰을 저장
    setCookie('token', token, { path: '/' });

    if (cookies.token) {
      navigate('/board');
    }
  }, [cookies, navigate, setCookie, token]);

  return null;
}

export default KakaoCallback;