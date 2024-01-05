import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { currentId } from "../util/atom";

const DiaryPage = () => {
  const navigation = useNavigate();
  const [searchData, setSearchData] = useState("");

  //recoil value
  const currentUser = useRecoilValue(currentId);

  const getId = (e) => {
    const getmyDiary = JSON.parse(localStorage.getItem(e.target.value));
    setSearchData(getmyDiary);
  };

  const goInputDiary = () => {
    navigation("/InputDiary");
  };

  useEffect(() => {
    console.log(currentUser);
    console.log("searchData: ", searchData);
  }, [searchData]);
  return (
    <Wrapper>
      <div>Diary Page</div>
      {/* <Loginbox>
        <div className='header'>일기 찾기</div>
        <InputTitelcontainer onChange={getId} />
        {searchData ?
          <div className='myDiary'>
            <GetmyDiary>{searchData.id}{searchData.title}{searchData.detail}</GetmyDiary>
          </div>
          : <div>등록된 일기가 없습니다 일기를 등록해주세요!</div>}
        <button onClick={goInputDiary}>일기 작성</button>
      </Loginbox> */}
    </Wrapper>
  );
};

export default DiaryPage;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isdark === "true"
      ? "background-color: #757674"
      : "background-color: white"}
`;

const Loginbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  box-shadow: 2px 2px 12px gray;
  background-color: #f2f2f2;
  width: 38vw;
  height: 70vh;
  border-radius: 1em;
  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .myDiary {
    flex-direction: row;
    width: 20vw;
  }
`;
const InputTitelcontainer = styled.input`
  width: 30vw;
  height: 3vh;
  margin-bottom: 0.5rem;
`;

const GetmyDiary = styled.div`
  background-color: #8ba85b;
`;
