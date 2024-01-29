/* eslint-disable default-case */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

// libraries
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//img
import LogoImg from "../assets/Logo.png";
import UserImg from "../assets/user_custom.png";
import LoginBlackImg from "../assets/login_black.png";
import CalendarImg from "../assets/calendar.png";
import LocationImg from "../assets/location.png";
import SearchImg from "../assets/search.png";
import PlusImg from "../assets/plus.png";
import CalendarLightgreenImg from "../assets/calendar_lightgreen.png";
import LocationLightgreenImg from "../assets/location_lightgreen.png";
import SearchLightgreenImg from "../assets/search_lightgreen.png";
import PlusLightgreenImg from "../assets/plus_ligthgreen.png";

// Components
import CalendarComponent from "../component/CalendarComponent";
import SearchComponent from "../component/SearchComponent";
import WriteDiaryComponent from "../component/WriteDiaryComponent";
import axios from "axios";

// custom hooks
import useKakaoLogin from "../hooks/useKakaoLogin";

const MainPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [pageState, setPageState] = useState();
  const [clickedPageState, setClickedPageState] = useState([]);
  const [activeComponent, setActiveComponent] = useState("");
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  });
  const [userInfo, setUserInfo] = useState();
  const [Authorization, setAuthorization] = useKakaoLogin({
    rest_api_key: process.env.REACT_APP_REST_API_KEY,
    redirect_uri: process.env.REACT_APP_REDIRECTION_URI,
  });
  console.log("PR템플릿");
  const fetchUserInfo = () => {
    setIsAuth(true);
    if (isAuth) {
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECTION_URI}&response_type=code`;
      window.location.href = kakaoURL;
    }
  };
  const getKakoauth = async () => {
    fetchUserInfo();
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/myDiary_Backend/kakaoLogin/",
          {
            code: code,
          }
        );
        setUserInfo((prevUserInfo) => {
          return { ...prevUserInfo, ...res };
        });
      } catch (e) {
        console.log("Kakao Login failed", e);
      }
    }
  };

  const showOtherComponent = (e) => {
    const { name } = e.target;
    setPageState(name);
    setActiveComponent(name);
    if (clickedPageState.includes(name)) {
      setClickedPageState((prevData) =>
        prevData.filter((item) => item !== name)
      );
    } else {
      setClickedPageState((prevData) => [...prevData, name]);
    }

    if (name === "Location") {
      const options = {
        timeout: 5000,
      };
      const watchID = navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
      );

      function success({ coords }) {
        console.log(coords);
        setLocation(coords.latitude, coords.longitude);
        // getAddress(coords.latitude, coords.longitude);
      }
      function error(err) {
        console.log(err);
      }
    }
  };

  // const getAddress = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${longitude},${latitude}&format=xml&type=both&zipcode=true&simple=false&key=${process.env.REACT_APP_SEARCH_API_KEY}`
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const renderDefaultContent = () => (
    <div className="row">
      <LoginImage src={LoginBlackImg} />
      <div className="signincomment">Sing in to write your diary</div>
      <SigninButton onClick={() => getKakoauth()}>Sign in</SigninButton>
    </div>
  );

  const componentMap = {
    CalendarComponent: <CalendarComponent />,
    SearchComponent: <SearchComponent />,
    WriteDiaryComponent: <WriteDiaryComponent />,
    renderDefaultContent: renderDefaultContent(),
  };

  const componentToShow = componentMap[pageState];

  useEffect(() => {
    console.log("pageState: ", pageState);
    console.log("clickedPageState: ", clickedPageState);
    console.log("userInfos:", userInfo);
  }, [pageState, clickedPageState, userInfo]);
  return (
    <Wrapper>
      <div className="header">
        <LogoImage
          src={LogoImg}
          name="renderDefaultContent"
          onClick={showOtherComponent}
        />
        <div className="title">MyDiary</div>
        {userInfo ? (
          <KakaoProfile src={userInfo.data.properties.profile_image} />
        ) : (
          <UserImage src={UserImg} />
        )}
      </div>
      <div className="drawer">
        <LocationImage
          src={
            clickedPageState.includes("Location") === true
              ? LocationLightgreenImg
              : LocationImg
          }
          name="Location"
          onClick={showOtherComponent}
        />
        <CalendarImage
          src={
            activeComponent.includes("CalendarComponent")
              ? CalendarLightgreenImg
              : CalendarImg
          }
          onClick={showOtherComponent}
          name="CalendarComponent"
        />
        <SearchImage
          src={
            activeComponent.includes("SearchComponent")
              ? SearchLightgreenImg
              : SearchImg
          }
          onClick={showOtherComponent}
          name="SearchComponent"
        />
        <PlusImage
          src={
            activeComponent.includes("WriteDiaryComponent")
              ? PlusLightgreenImg
              : PlusImg
          }
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

const KakaoProfile = styled.img`
  position: absolute;
  right: 2.5rem;
  width: 3.5rem;
  height: 8vh;
  border-radius: 50%;
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
