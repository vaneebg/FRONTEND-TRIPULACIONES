import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import PrivateZone from './guards/PrivateZone';
import 'antd/dist/antd.css';
import Profile from './components/Main/Profile/Profile';
import Quiz from './components/Main/Quiz/Quiz';
import Register from './components/Home/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';
import RouteDetail from './components/Main/Routes/Route/RouteDetail/RouteDetail';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/main' element={<PrivateZone><Main /></PrivateZone>} />
          <Route path='/profile' element={<PrivateZone><Profile /></PrivateZone>} />
          <Route path='/quiz' element={<PrivateZone><Quiz /></PrivateZone>} />
          <Route path='/register' element={<Register />} />
          <Route path='/aboutUs' element={<AboutUs/>}/>
          <Route path='/routes/route/:_id' element={<RouteDetail/> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
