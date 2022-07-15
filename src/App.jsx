import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
// import PrivateZone from './guards/PrivateZone';
import "antd/dist/antd.css";
import Profile from './components/Main/Profile/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
