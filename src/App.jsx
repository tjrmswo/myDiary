import React from 'react';
import { Routes, Route } from 'react-router-dom';

//pages
import Login from './pages/Login';
import MainPage from './pages/MainPage';
const App = () => {

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/MainPage' element={<MainPage />} />
    </Routes>


  );
}

export default App;

