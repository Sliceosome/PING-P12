import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Home from '../Home/Home';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  return (
    <div className="wrapper">
      <BrowserRouter>
         <Routes> 
      if(!token) {
         <Route path='/' element={<Login setToken={setToken}/>} />
      }
      else{
         <Route path='/' element={<Home/>} />
      }
        <Route path='/home' element={<Home/>} />
         <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
