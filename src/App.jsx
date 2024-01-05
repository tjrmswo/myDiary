import React from "react";
import { Routes, Route } from "react-router-dom";

//recoil
import { RecoilRoot } from "recoil";

//pages
import MainPage from "./pages/MainPage";
import DiaryPage from "./pages/DiaryPage";
import Signup from "./pages/Signup";
import InputDiary from "./pages/InputDiary";
const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/DiaryPage" element={<DiaryPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/InputDiary" element={<InputDiary />} />
      </Routes>
    </RecoilRoot>
  );
};

export default App;
