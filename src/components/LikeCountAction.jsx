import React, { useState } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import styled from 'styled-components';

const LikeCountAction = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [notice, setNotice] = useState('');
  
    const onClick = () => 
        isChecked
          ? (setIsChecked(false), setNotice(''))
          : (setIsChecked(true), setNotice('좋아요 1회'));
  
    return (
      <React.Fragment>
        <Wrap>
          {isChecked ?  
          <AiFillHeart size="30" color="red" onClick={onClick}/> :
          <AiOutlineHeart size="30" onClick={onClick}/>}
          <P>{notice}</P>
        </Wrap>
      </React.Fragment> 
    );
  };

export default LikeCountAction

const Wrap = styled.div `
  position:relative;
  top:0; left:15px;
  cursor:pointer;
`


const P = styled.p `
  position:absolute;
  left:-15px;
  width:80px;
  display:flex;
  margin-top:5px;
  margin-bottom:20px;
  font-weight:500;
  font-size:1rem;
`