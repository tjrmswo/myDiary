import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router';
import { useRecoilValue } from "recoil";
import { currentId } from "../util/atom";

const InputDiary = () => {
  const navigation = useNavigate();
  const currentUser = useRecoilValue(currentId);
  console.log(currentUser);
  const [diaryData, setDiaryData] = useState({
    id: `${currentUser}일기`,
    title: '',
    detail: '',
  });

  const { title, detail } = diaryData;
  const inputdetail = (e) => {
    const { name, value } = e.target;
    setDiaryData({
      ...diaryData,
      [name]: value
    })
  }
  const saveDiary = () => {
    localStorage.setItem(`${title}`, JSON.stringify(diaryData))
    setDiaryData({
      id: `${currentUser}일기`,
      title: '',
      detail: ''
    })
  }
  useEffect(() => {
    console.log(diaryData);
  }, [diaryData])

  return (
    <Wrapper>
      <Loginbox>
        <div className='header'>일기 쓰기</div>
        <div className='title'>제목</div>
        <InputTitelcontainer onChange={inputdetail} name='title' value={title} />
        <div className='detail'>내용</div>
        <Inputcontainer onChange={inputdetail} name='detail' value={detail} />
        <button className='saveDiary' onClick={saveDiary}>저장</button>
      </Loginbox>
    </Wrapper>
  );
};

export default InputDiary;

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
  height: 70vh;
  border-radius: 1em;
  .header{
    font-size: 1.5em;
    font-weight: bold;
  }
  .title {
    font-size: larger;
    align-self: flex-start;
    margin-left: 4rem;
  }
  .detail{
    font-size: larger;
    align-self: flex-start;
    margin-left: 4rem;
  }
  .saveDiary{
    align-self: flex-end;
    margin-right: 4rem;
  }
`
const InputTitelcontainer = styled.input`
  width: 30vw;
  height: 3vh;
  margin-bottom: 0.5rem;
`;

const Inputcontainer = styled.textarea`
  width: 30vw;
  height: 30vh;
  margin-bottom: 0.5rem;
`;
