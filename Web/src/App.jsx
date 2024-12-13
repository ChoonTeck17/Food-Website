import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import DoneOrder from './pages/DoneOrder/DoneOrder';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation();

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} 
        <div className='app'>
        {/* <Navbar setShowLogin={setShowLogin}/> */}
        {location.pathname !== '/DoneOrder' && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/DoneOrder' element={<DoneOrder/>}/>
        </Routes>
      </div>
      <Footer/>
    </>

  )
}


export default App