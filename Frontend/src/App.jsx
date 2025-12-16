import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import Hero from './Components/Hero'
import Destinations from './Components/Destination'
import Footer from './Components/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Destinations /> */}
      {/* <Features />
      <Testimonials /> */}
      <Footer />
    </div>
  )
}

export default App
