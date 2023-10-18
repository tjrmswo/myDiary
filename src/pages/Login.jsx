import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentId } from "../util/atom";

const Login = () => {
  const navigation = useNavigate();

  const [background, setBackground] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });
  const [currentUser, setCurrentUser] = useRecoilState(currentId);

  const { id, password } = userData;
  const searchPassword = JSON.parse(localStorage.getItem(id));

  const inputData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const logIn = () => {
    if (localStorage.getItem(id) && searchPassword.password === password) {
      localStorage.setItem(`cnt${id}`, id);
      setCurrentUser(id);
      navigation('/MainPage')
    } else {
      alert('아이디 또는 비밀번호를 확인해주세요')
    }
  }

  const goAssign = () => {
    navigation('/Signup')
  }

  useEffect(() => {
    console.log("id: ", id);
    console.log("currentUser: ", currentUser);
  }, [id, currentUser])

  return (
    <Wrapper isdark={background.toString()}>
      <Loginbox>
        <div className="headerContainer">
          <Diarytitle>나만의 일기장 만들기</Diarytitle><ChangeTheme onClick={() => setBackground(!background)}>darkmode</ChangeTheme>
        </div>
        <div className="bodyConatiner">
          <div className="Id">ID</div>
          <Inputcontainer name='id' value={id} type="ID" required onChange={inputData} />
          <div className="Password">Password</div>
          <Inputcontainer name="password" value={password} type="password" required onChange={inputData} />
        </div>
        <LoginButton onClick={logIn}>로그인</LoginButton>
        <AssignButton onClick={goAssign}>회원 가입</AssignButton>
      </Loginbox>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  ${(props) => props.isdark === "true" ? 'background-color: #757674' : 'background-color: white'}
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
  
  .headerContainer {
    margin-bottom: 1rem;
  }
  .Id {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 550;
  }
  .bodyConatiner { 
    margin-bottom: 5em;
  }
  .Password {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 550;
  }
`
const Diarytitle = styled.span`
  font-size: 2em;
  font-weight: bold;
`
const ChangeTheme = styled.button`
  font-weight: bold;
`;

const Inputcontainer = styled.input`
  width: 30vw;
  height: 3vh;
`;

const LoginButton = styled.button`
  width: 20vw;
  height: 5vh;
`

const AssignButton = styled.button`
  width: 20vw;
  height: 5vh;
`
