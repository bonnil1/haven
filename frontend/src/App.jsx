import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Email from './pages/Email'
import Password from './pages/Password';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Prelanding from './pages/Prelanding';
import Search from './pages/Search'
import Rentals from './pages/Rentals';
import Show from './pages/Show';
import HousingRequest from './pages/HousingRequest';
import Lease1 from './pages/Lease1';
import Lease2 from './pages/Lease2'
import Lease3 from './pages/Lease3';
import Lease4 from './pages/Lease4';
import Lease5 from './pages/Lease5';
import ListProperty from './pages/ListProperty';
import UserProfile from './pages/UserProfile';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles.css';


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
        <Route path='/verification' element={<Email />}/>
        <Route path='/signup/pw' element={<Password setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/signup/pw/profile' element={<Profile />}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/' element={<Prelanding closeMenu={closeMenu} />}/>
        <Route path='/home' element={<Search closeMenu={closeMenu}/>} />
        <Route path='/home/rentals' element={<Rentals />}/>
        <Route path='/home/rentals/show' element={<Show />}/>
        <Route path='/housing-request' element={<HousingRequest />}/>
        <Route path='/lease-1' element={<Lease1 />}/>
        <Route path='/lease-2' element={<Lease2 />}/>
        <Route path='/lease-3' element={<Lease3 />}/>
        <Route path='/lease-4' element={<Lease4 />}/>
        <Route path='/lease-5' element={<Lease5 />}/>
        <Route path='/list-your-property' element={<ListProperty />}/>
        <Route path='/profile' element={<UserProfile />}/>
        <Route path='/contact' element={<Contact />}/>
      </Routes>
    </div>
  </Router>
  )
}

export default App

