import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Learn from '../pages/learn'
import Practice from '../pages/Practice'
import Navbar from '../components/Navbar'
import About from '../pages/About'

const Routers = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default Routers
