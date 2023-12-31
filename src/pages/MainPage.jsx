/* eslint-disable default-case */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

// libraries
import styled from "styled-components";

//img
import LogoImg from "../assets/Logo.png";
import UserImg from "../assets/user_custom.png";
import LoginBlackImg from "../assets/login_black.png";
import CalendarImg from "../assets/calendar.png";
import LocationImg from "../assets/location.png";
import SearchImg from "../assets/search.png";
import PlusImg from "../assets/plus.png";

// Components
import CalendarComponent from "../component/CalendarComponent";
import SearchComponent from "../component/SearchComponent";
import WriteDiaryComponent from "../component/WriteDiaryComponent";

const MainPage = () => {
  const [pageState, setPageState] = useState();

  const showOtherComponent = (e) => {
    const { name } = e.target;
    setPageState(name);
  };

  const renderDefaultContent = () => (
    <div className="row">
      <LoginImage src={LoginBlackImg} />
      <div className="signincomment">Sing in to write your diary</div>
      <SigninButton>Sign in</SigninButton>
    </div>
  );

  const componentMap = {
    CalendarComponent: <CalendarComponent />,
    SearchComponent: <SearchComponent />,
    WriteDiaryComponent: <WriteDiaryComponent />,
    renderDefaultContent: renderDefaultContent(),
  };

  const componentToShow = componentMap[pageState];
  return (
    <Wrapper>
      <div className="header">
        <LogoImage
          src={LogoImg}
          name="renderDefaultContent"
          onClick={showOtherComponent}
        />
        <div className="title">MyDiary</div>
        <UserImage src={UserImg} />
      </div>
      <div className="drawer">
        <LocationImage src={LocationImg} name="Location" />
        <CalendarImage
          src={CalendarImg}
          onClick={showOtherComponent}
          name="CalendarComponent"
        />
        <SearchImage
          src={SearchImg}
          onClick={showOtherComponent}
          name="SearchComponent"
        />
        <PlusImage
          src={PlusImg}
          onClick={showOtherComponent}
          name="WriteDiaryComponent"
        />
      </div>
      {componentToShow || renderDefaultContent()}
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  /* background-color: #f6fdff; */

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
    margin-top: 15rem;
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

const SearchImage = styled.img`
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
