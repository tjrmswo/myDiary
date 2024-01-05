/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../font.css";

// libraries
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// custom hooks
import useInputData from "../hooks/useInputData";

const WriteDiaryComponent = () => {
  const [diary, setDiary] = useState({
    date: "",
  });

  const inputData = (e) => {
    const data = useInputData(e, diary, setDiary);
    data();
  };

  const achieveDate = (e) => {
    setDiary((prev) => ({
      ...prev,
      date: e,
    }));
  };

  const { date } = diary;
  return (
    <Container>
      <div className="titleRow">
        <div className="title">Title</div>
        <Input type="text" name="title" onChange={inputData} />
        <DatePicker
          selected={date ? date : new Date()}
          name="datePicker"
          onChange={achieveDate}
          showIcon
        />
      </div>
      <div className="titleRow">
        <div className="content">Content</div>
        <Textarea type="text" name="content" onChange={inputData} />
      </div>
    </Container>
  );
};

export default WriteDiaryComponent;

const Container = styled.div`
  font-family: "GmarketSans-Medium";
  width: 70vw;
  margin-top: 4rem;

  .titleRow {
    flex-direction: column;
    margin-top: 1.5rem;
  }
  /* .row {
    flex-direction: row;
  } */
  .title {
    height: 5vh;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .content {
    height: 5vh;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const Input = styled.input`
  font-family: "GmarketSans-Medium";
  width: 20vw;
  height: 5vh;
  font-size: 1.1rem;
  background-color: #e5f8ff;
  border-radius: 1rem;
  margin-right: 1rem;

  border: none;
  &:focus {
    outline: gray;
  }
`;

const Textarea = styled.textarea`
  font-family: "GmarketSans-Medium";
  font-size: 1rem;
  width: 70vw;
  height: 60vh;
  border-radius: 1rem;
  background-color: #e9f6fb;
  border: none;
  &:focus {
    outline: gray;
  }
`;
