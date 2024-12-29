import React from 'react'
import { useState } from 'react';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Prelanding from './pages/Prelanding';
import Landing from './pages/Landing'
import Rentals from './pages/Rentals';
import Show from './pages/Show';
import HousingRequest from './pages/HousingRequest';
import ListProperty from './pages/ListProperty';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

  return (
    <Router>
      <div>
        <Navigation isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} closeMenu={closeMenu} />
        <Routes>
        <Route path='sign-up' element={<Signup />}/>
          <Route path='login' element={<Login />}/>
          <Route path='/' element={<Prelanding closeMenu={closeMenu}/>}/>
          <Route path='home' element={<Landing closeMenu={closeMenu}/>} />
          <Route path='home/rentals' element={<Rentals />}/>
          <Route path='home/rentals/show' element={<Show />}/>
          <Route path='housing-request' element={<HousingRequest />}/>
          <Route path='list-your-property' element={<ListProperty />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

