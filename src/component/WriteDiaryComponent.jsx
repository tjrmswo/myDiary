/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../font.css";

// libraries
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";
import moment from "moment";

// custom hooks
import useInputData from "../hooks/useInputData";

// img
import LocationImg from "../assets/location_black.png";
import axios from "axios";

const WriteDiaryComponent = () => {
  const [diary, setDiary] = useState({
    diary_uuid: "",
    username: "",
    diary_title: "",
    diary_content: "",
    diary_address: "",
    diary_date: "",
  });

  const inputData = (e) => {
    const data = useInputData(e, diary, setDiary);
    data();
  };

  const achieveDate = (e) => {
    setDiary((prev) => ({
      ...prev,
      diary_date: e,
    }));
  };

  const saveDiary = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/myDiary_Backend/postDiary/",
        {
          diary_uuid: uuid().slice(0, 6),
          diary_userid: "근재2",
          diary_title: diary_title,
          diary_content: diary_content,
          diary_emotionid: "",
          diary_date: moment(diary_date).format("YYYY-MM-DD"),
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.config);
    }
  };

  const { diary_date, diary_title, diary_content } = diary;
  return (
    <Container>
      <div className="titleRow">
        <div className="title">Title</div>
        <Input type="text" name="diary_title" onChange={inputData} />
        <DatePicker
          selected={diary_date ? diary_date : new Date()}
          name="datePicker"
          type="date"
          onChange={achieveDate}
          showIcon
        />
        <LocationImage src={LocationImg} />
      </div>
      <div className="titleRow">
        <div className="content">Content</div>
        <Textarea type="text" name="diary_content" onChange={inputData} />
      </div>
      <div className="buttonRow">
        <SaveButton onClick={saveDiary}>저장</SaveButton>
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
  .buttonRow {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
    width: 72vw;
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
  padding: 1em;
  font-size: 1rem;
  width: 70vw;
  height: 50vh;
  border-radius: 1rem;
  background-color: #e9f6fb;
  border: none;
  &:focus {
    outline: gray;
  }
`;

const LocationImage = styled.img`
  margin-left: 1rem;
  width: 1.5vw;
  height: 3vh;
`;

const SaveButton = styled.button`
  width: 5vw;
  height: 4.8vh;
  color: white;
  background-color: #23b1dc;
  font-size: 1.2em;
  border-radius: 0.2rem;
  border: none;
  font-family: "GmarketSans-Medium";
  & :focus {
    outline: none;
  }
`;
