import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Practice from '../pages/Practice'
import Navbar from '../components/Navbar'
import About from '../pages/About'
import ProtectedRoute from '../utils/ProtectedRoute'
import Play from '../pages/Play'
import Translate from '../pages/Translate'

const Routers = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/translate"
            element={
              <ProtectedRoute>
                <Translate />
              </ProtectedRoute>
            } />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            } />
          <Route
            path="/play"
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default Routers
