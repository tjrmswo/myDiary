import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Diary from '../assets/images/diaryBackground.jpeg'
const Login = () => {
    const navigation = useNavigate();
    const [background, setBackground] = useState(false);
    const [userData, setUserData] = useState({
        id: '',
        password: '',
    });
    const [userList, setUserList] = useState([])

    const { id, password } = userData;
    const inputData = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const saveUserData = () => {
        setUserList(prev => [...prev, userData.id])
        userList.filter(item => {
            if (item === userData.id) {
                console.log('User already exists!')
            } else {
                localStorage.setItem(`${id}`, JSON.stringify(userData));
            }
        })
        navigation('/MainPage');
    }

    useEffect(() => {
        console.log("userData: ", userData);
        console.log("userList: ", userList)
    }, [userData, userList])
    return (
        <Wrapper isdark={background.toString()}>
            {/* <img src={Diary} alt="이미지" /> */}
            <Loginbox>
                <div className="headerContainer">
                    <Diarytitle>나만의 일기장 만들기</Diarytitle><ChangeTheme onClick={() => setBackground(!background)} >darkmode</ChangeTheme>
                </div>
                <div className="bodyConatiner">
                    <div className="Id">ID</div>
                    <Inputcontainer name='id' value={id} type="ID" required onChange={inputData} />
                    <div className="Password">Password</div>
                    <Inputcontainer name="password" value={password} type="password" required onChange={inputData} />
                </div>
                <Assignbutton onClick={saveUserData}>로그인</Assignbutton>
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
  ${(props) => props.isdark === 'true' ? 'background-color: #A4A4A4' : 'background-color: white'}
  background-image: url('../assets/images/diaryBackground.jpeg');
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

const Assignbutton = styled.button`
  width: 20vw;
  height: 5vh;
`
