// import { useState } from 'react'
import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DrawingApp } from "./pages";
import { Navbar, Home, Donate, Footer } from "./components";
function App() {
  return ( 
      <div className="min-h-screen  bg-white dark:bg-gray-800 text-black dark:text-white">
        <BrowserRouter>
          <div className="gradient-bg-welcome">
            <Navbar />
            <Routes>
              <Route path="/Home" element={(<Home />)} />
              <Route path="/Donate" element={(<Donate />)} />
              <Route path="/DrawingApp" element={(<DrawingApp />)} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div> 
  )
}

export default App
