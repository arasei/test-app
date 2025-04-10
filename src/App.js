import React from 'react';
import { Home } from './pages/Home'
import { HomeDetail } from './pages/HomeDetail'
import { Header } from './components/Header';
import { Routes, Route, } from "react-router-dom";
import { Contact } from "./pages/Contact";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/posts/:id" element={<HomeDetail />}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App;