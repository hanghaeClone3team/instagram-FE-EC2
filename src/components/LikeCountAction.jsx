import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import styled from 'styled-components';

class LikeCount extends React.Component{
  state = {
      isChecked: false,
      notice: ' ',
  };

  onClick = () => {
      this.state.isChecked ?
      this.setState({
          isChecked: false,
          notice: '',
      })
      :
      this.setState({
          isChecked: true,
          notice: '좋아요 1회',
      });
  }
  render(){
      return(
          <React.Fragment>
              <Wrap>
                  {this.state.isChecked ?  
                  <AiFillHeart size="30" color="red" onClick={this.onClick}/> :
                  <AiOutlineHeart size="30" onClick={this.onClick}/>}
                  <P>{this.state.notice}</P>
              </Wrap>
          </React.Fragment> 
      )
  }
}

export default LikeCount

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