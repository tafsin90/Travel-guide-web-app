import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './routes/Home'
import Districts from './routes/Districts'
import DistrictPlaces from './routes/DistrictPlaces'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Redirect root to login if not authenticated, otherwise to home */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bangladesh" 
            element={
              <ProtectedRoute>
                <Districts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/districts/:id" 
            element={
              <ProtectedRoute>
                <DistrictPlaces />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
