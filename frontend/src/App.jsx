import React from 'react'
import Navigation from './components/Navigation';
//import LogIn from './pages/Login';
import Landing from './pages/Landing'
import Rentals from './pages/Rentals';
import Show from './pages/Show';
import HousingRequest from './pages/HousingRequest';
import ListProperty from './pages/ListProperty';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path='login' element={<LogIn />} />
          <Route path='/' element={<Landing />} />
          <Route path='rentals' element={<Rentals />}/>
          <Route path='rentals/show' element={<Show />}/>
          <Route path='housing-request' element={<HousingRequest />}/>
          <Route path='list-your-property' element={<ListProperty />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

