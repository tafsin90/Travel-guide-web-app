import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './routes/Home'
import Districts from './routes/Districts'
import DistrictPlaces from './routes/DistrictPlaces'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bangladesh" element={<Districts />} />
          <Route path="/districts/:id" element={<DistrictPlaces />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>

  )
}

export default App
