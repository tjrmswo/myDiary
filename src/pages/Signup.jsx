import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userListData } from '../util/atom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigation = useNavigate();
    const [userData, setUserData] = useState({
        id: '',
        password: '',
        nickname: '',
        number: ''
    })
    // recoil 상태
    const [userList, setUserList] = useRecoilState(userListData);
    const ResetData = useResetRecoilState(userListData);

    const { id, password, nickname, number } = userData;

    const inputData = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const signupUser = () => {
        localStorage.setItem(`${id}`, JSON.stringify(userData))
        setUserList(prev => [...prev, id]);
        navigation('/');
    }


    useEffect(() => {
        console.log("userData: ", userData);
        console.log("userList: ", userList);
    }, [userData, userList])

    return (
        <Wrapper>
            <Loginbox>
                <Title>회원가입</Title>
                <div className='id'>ID</div>
                <InputContainer placeholder='아이디를 입력하세요' name='id' value={id} onChange={inputData} />
                <div className='password'>Password</div>
                <InputContainer placeholder='비밀번호를 입력하세요' name='password' value={password} onChange={inputData} type='password' />
                <div className='nickname'>Nickname</div>
                <InputContainer placeholder='닉네임를 입력하세요' name='nickname' value={nickname} onChange={inputData} />
                <div className='phone-number'>Phone-Number</div>
                <InputContainer placeholder='전화번호를 입력하세요' name='number' value={number} onChange={inputData} />
                <SignupButton onClick={signupUser}>가입 완료</SignupButton>
                <button onClick={ResetData}>userList Reset</button>
            </Loginbox>
        </Wrapper>
    );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Loginbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  box-shadow: 2px 2px 12px gray;
  background-color: #F2F2F2;
  width: 38vw;
  height: 60vh;
  border-radius: 1em;
  .id,.phone-number,.password, .nickname {
    align-self: flex-start;
    margin-bottom: 0.5rem;
    margin-left: 3.6em;
    font-size: large;
    font-weight: bold;
  }
`

const InputContainer = styled.input`
    width: 30vw;
    height: 3vh;
    margin-bottom: 1rem;
`

const Title = styled.h2`
    font-weight: 600;
`

const SignupButton = styled.button`

`