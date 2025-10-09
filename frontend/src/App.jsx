import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Email from './pages/Email';
import Password from './pages/Password';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Prelanding from './pages/Prelanding';
import Landing from './pages/Landing';
import RenterDashboard from './pages/RenterDashboard';
import Rentals from './pages/Rentals';
import AllRentals from './pages/AllRentals';
import Show from './pages/Show';
import ShowEdit from './pages/ShowEdit';
import HousingRequest from './pages/HousingRequest';
import Lease1 from './pages/Lease1';
import Lease2 from './pages/Lease2';
import Lease3 from './pages/Lease3';
import Lease4 from './pages/Lease4';
import Lease5 from './pages/Lease5';
import Lease6 from './pages/Lease6';
import ListProperty from './pages/ListProperty';
import ListingDashboard from './pages/ListingDashboard';
import AllListings from './pages/AllListings';
import ProfileEdit from './pages/ProfileEdit';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles.css';


const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    console.log("toggling")
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleUserToggle = (role) => {
    console.log('Switched to:', role)
  }

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
      <Navigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} menuRef={menuRef} onToggle={handleUserToggle}/>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/verification' element={<Email />}/>
        <Route path='/signup/pw' element={<Password setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/signup/pw/profile' element={<Profile />}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/' element={<Prelanding closeMenu={closeMenu} isLoggedIn={isLoggedIn}/>}/>
        <Route path='/home' element={<Landing closeMenu={closeMenu}/>} />
        <Route path='/renter-dashboard' element={<RenterDashboard closeMenu={closeMenu}/>} />
        <Route path='/rentals' element={<Rentals />}/>
        <Route path='/rentals/show/:id' element={<Show />}/>
        <Route path='/rentals/show/edit/:id' element={<ShowEdit />}/>
        <Route path='/all-rentals' element={<AllRentals />}/>
        <Route path='/housing-request' element={<HousingRequest />}/>
        <Route path='/lease-1' element={<Lease1 />}/>
        <Route path='/lease-2' element={<Lease2 />}/>
        <Route path='/lease-3' element={<Lease3 />}/>
        <Route path='/lease-4' element={<Lease4 />}/>
        <Route path='/lease-5' element={<Lease5 />}/>
        <Route path='/lease-6' element={<Lease6 />}/>
        <Route path='/list-your-property' element={<ListProperty />}/>
        <Route path='/listing-dashboard' element={<ListingDashboard />}/>
        <Route path='/all-listings' element={<AllListings />}/>
        <Route path='/profile' element={<ProfileEdit />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/settings' element={<Settings />}/>
      </Routes>
    </div>
  </Router>
  )
}

export default App

