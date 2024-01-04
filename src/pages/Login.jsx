import React, { useState, useEffect } from "react";

// libraries
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentId } from "../util/atom";

//img
import LogoImg from "../assets/Logo.png";
import UserImg from "../assets/user_custom.png";
import LoginBlackImg from "../assets/login_black.png";
import CalendarImg from "../assets/calendar.png";
import LocationImg from "../assets/location.png";
import PlusImg from "../assets/plus.png";

const Login = () => {
  const navigation = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useRecoilState(currentId);

  const { id, password } = userData;
  const searchPassword = JSON.parse(localStorage.getItem(id));

  const inputData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const logIn = () => {
    if (localStorage.getItem(id) && searchPassword.password === password) {
      localStorage.setItem(`cnt${id}`, id);
      setCurrentUser(id);
      navigation("/MainPage");
    } else {
      alert("아이디 또는 비밀번호를 확인해주세요");
    }
  };

  const goAssign = () => {
    navigation("/Signup");
  };

  useEffect(() => {
    console.log("id: ", id);
    console.log("currentUser: ", currentUser);
  }, [id, currentUser]);

  return (
    <Wrapper>
      <div className="header">
        <LogoImage src={LogoImg} />
        <div className="title">MyDiary</div>
        <UserImage src={UserImg} />
      </div>
      <div className="drawer">
        <LocationImage src={LocationImg} />
        <CalendarImage src={CalendarImg} />
        <PlusImage src={PlusImg} />
      </div>
      <div className="row">
        <LoginImage src={LoginBlackImg} />
        <div className="signincomment">Sing in to write your diary</div>
        <SigninButton>Sign in</SigninButton>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f6fdff;

  .drawer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0;
    width: 5vw;
    height: 100vh;
    background-color: #232323;
  }
  .header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100vw;
    height: 10vh;
    background-color: #e9f6fb;
  }
  .title {
    font-size: 1.2rem;
    height: 10vh;
    display: flex;
    align-items: center;
    color: #23b1dc;
    font-weight: bold;
  }
  .row {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .signincomment {
    margin-top: 0.5rem;
    color: gray;
  }
`;

const LogoImage = styled.img`
  width: 4vw;
  height: 8vh;
`;

const LoginImage = styled.img`
  width: 5vw;
  margin-top: 2rem;
`;

const UserImage = styled.img`
  position: absolute;
  right: 3rem;
  width: 2.5vw;
`;

const PlusImage = styled.img`
  width: 2vw;
  margin-top: 2rem;
`;

const CalendarImage = styled.img`
  width: 2vw;
  margin-top: 2rem;
`;

const LocationImage = styled.img`
  width: 2vw;
  margin-top: 2rem;
`;

const SigninButton = styled.button`
  width: 6vw;
  height: 4.5vh;
  margin-top: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: #23b1dc;
  color: white;
`;
