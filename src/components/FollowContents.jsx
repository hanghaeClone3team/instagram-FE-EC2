import styled from 'styled-components'
import React from 'react';

class FollowContents extends React.Component{
    state = {
        isChecked: false,
    };

    onClick = () => {
        this.state.isChecked ?
        this.setState({
            isChecked: false,
        })
        :
        this.setState({
            isChecked: true,
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked ?  
                    <FollowBtn onClick={this.onClick}>팔로우 하기</FollowBtn> : <FollowBtn onClick={this.onClick}>팔로우 취소</FollowBtn>}
                </div>
            </React.Fragment> 
        )
    }
}

export default FollowContents


const FollowBtn = styled.button`
    font-size: 0.9rem;
    line-height: 18px;
    font-weight: 600;
    margin-bottom:5px;
    margin-left: 35px;
    cursor: pointer;
    color: #18a4f8;
`