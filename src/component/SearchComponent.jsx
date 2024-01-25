import React, { useEffect, useState } from "react";
import "../font.css";

// libraries
import styled, { css } from "styled-components";
import axios from "axios";

// img
import Search from "../assets/searchbutton.png";
import TagImage from "../assets/tagimage.png";
import Delete from "../assets/delete.png";
import useDropdownMenu from "../hooks/useDropdownMenu";
import TagBlackImage from "../assets/tag_black.png";

// constants
import { ManyTags } from "../constants/ManyTags";

const SearchComponent = () => {
  const [searchDiary, setSearchDiary] = useState("");
  const [tags, setTags] = useState([]);
  const [dropdownIsOpen, dropdownRef, dropdownHandler] = useDropdownMenu(false);

  const search = (e) => {
    const { value } = e.target;
    setSearchDiary(value);
  };
  const searchData = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/myDiary_Backend/searchDiary/",
        {
          diary_title: searchDiary,
          tags: tags,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.config);
    }
  };
  const selectTags = (tagName) => {
    setTags((pre) => [...pre, tagName]);
  };

  const removeTags = (tagName) => {
    console.log("tagName: ", tagName.emotionid);
    const remove = tags.filter((tag) => tag.emotionid !== tagName.emotionid);
    setTags(remove);
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);
  return (
    <Container>
      <div className="searchRow">
        <Input name="search" onChange={search} />
        <SearchButton src={Search} onClick={searchData} />
      </div>
      <div className="tagContainer">
        {tags.length > 0
          ? tags.map((item, i) => (
              <div className="tagButtons" key={i}>
                <div className="emotionid">{item.emotionid}</div>
                <XImage src={Delete} onClick={() => removeTags(item)} />
              </div>
            ))
          : null}
      </div>
      <div className="fliterRow">
        <div className="Fliters">Fliters</div>
        <div className="tagRow">
          <TagImg src={TagImage} />
          <div className="tags">Tags</div>
          <div
            className="dropdownButton"
            onClick={dropdownHandler}
            ref={dropdownRef}
          >
            {dropdownIsOpen ? "∨" : "∧"}
          </div>
        </div>
        <Menu isDropped={dropdownIsOpen}>
          <Ul>
            {ManyTags.map((item, i) => (
              <Li key={i} onClick={() => selectTags(item)}>
                <TagBlackImg src={TagBlackImage} />
                <LinkWrapper>
                  {item.emotionIcon} {item.emotion}
                </LinkWrapper>
              </Li>
            ))}
          </Ul>
        </Menu>
      </div>
    </Container>
  );
};

export default SearchComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;

  .searchRow {
    display: flex;
    align-items: center;
    margin-top: 8rem;
  }

  .fliterRow {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }

  .Fliters {
    font-family: "GmarketSans-Medium";
    color: #23b1dc;
  }

  .tagContainer {
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
  }

  .tagRow {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 2rem;
    border-bottom: 2px solid gray;
    padding-bottom: 0.5rem;
  }

  .tags {
    width: 84%;
    margin-left: 2rem;
    font-family: "GmarketSans-Medium";
  }

  .tagButtons {
    width: 7vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #23b1dc;
    border: 2px solid gray;
    border-radius: 1rem;
    padding: 0.5rem;
    margin-right: 0.2rem;
  }

  .emotionid {
    font-family: "GmarketSans-Medium";
    margin-right: 0.2rem;
    color: white;
  }

  .dropdownButton {
    font-weight: bold;
  }

  .dropdownTag {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 0.5rem;
    border-bottom: 2px solid gray;
    padding-bottom: 0.5rem;
  }
  .dropdownContainer {
    flex-direction: column;
  }
`;

const Input = styled.input`
  font-family: "GmarketSans-Medium";
  width: 30vw;
  height: 5vh;
  font-size: 1.1rem;
  background-color: #e5f8ff;
  border-radius: 1rem;
  padding-left: 1rem;
  margin-right: 1rem;

  border: none;
  &:focus {
    outline: gray;
  }
`;

const SearchButton = styled.img`
  width: 2vw;
  height: 4vh;
`;

const TagImg = styled.img`
  margin-left: 1rem;
  width: 1vw;
`;

const XImage = styled.img`
  width: 2vw;
`;

const TagBlackImg = styled.img`
  width: 1vw;
  height: 2vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 5;

  &:after {
    content: "";
    transform: translate(-50%, -50%);
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  position: absolute;
  left: 56%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Li = styled.li`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 2px solid gray;
  margin-top: 0.5rem;
`;

const LinkWrapper = styled.div`
  font-size: 1rem;
  color: black;
  font-family: "GmarketSans-Medium";
  margin-bottom: 0.7rem;
  margin-top: 0.45rem;
`;
