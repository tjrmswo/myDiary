import React from 'react';
import { Routes, Route } from 'react-router-dom';

//recoil
import { RecoilRoot } from 'recoil';

//pages
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Signup from './pages/Signup';
import InputDiary from './pages/InputDiary';
const App = () => {

  return (
    <RecoilRoot>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/MainPage' element={<MainPage />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/InputDiary' element={<InputDiary />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;

