import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Password from './pages/Password';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Prelanding from './pages/Prelanding';
import Landing from './pages/Landing'
import Rentals from './pages/Rentals';
import Show from './pages/Show';
import HousingRequest from './pages/HousingRequest';
import ListProperty from './pages/ListProperty';
import UserProfile from './pages/UserProfile';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    console.log("toggling")
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        //console.log(isMenuOpen)
          if (isMenuOpen && !menuRef.current?.contains(event.target)) {
            setIsMenuOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isMenuOpen]);

return (
  <Router>
    <div>
      <Navigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} menuRef={menuRef}/>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signup/pw' element={<Password setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/signup/pw/profile' element={<Profile />}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/' element={<Prelanding closeMenu={closeMenu} />}/>
        <Route path='/home' element={<Landing closeMenu={closeMenu}/>} />
        <Route path='/home/rentals' element={<Rentals />}/>
        <Route path='/home/rentals/show' element={<Show />}/>
        <Route path='/housing-request' element={<HousingRequest />}/>
        <Route path='/list-your-property' element={<ListProperty />}/>
        <Route path='/profile' element={<UserProfile />}/>
        <Route path='/contact' element={<Contact />}/>
      </Routes>
    </div>
  </Router>
  )
}

export default App

