import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import Hero from './Components/Hero'
import Location from './Components/Location'
import Footer from './Components/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <Location />
      <Footer />
    </div>
  )
}

export default App
