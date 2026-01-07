import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/Profile.css'

export default function Profile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to view your profile')
        setLoading(false)
        return
      }

      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile')
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
      setSearchResults(res.data)
    } catch (err) {
      console.error('Search error:', err)
    }
  }

  const handleAddToWishlist = async (spotId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:5000/api/user/wishlist',
        { spotId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert('Added to wishlist!')
      setShowSearch(false)
      setSearchQuery('')
      setSearchResults([])
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to wishlist')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="error-message">{error}</div>
        </div>
      </div>
    )
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        
        <div className="profile-info">
          <div className="info-item">
            <strong>Name:</strong> {user.name || 'N/A'}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {user.email || 'N/A'}
          </div>
          <div className="info-item">
            <strong>Total Visited Places:</strong> {data?.totalVisited || 0}
          </div>
        </div>

        <div className="visited-places">
          <h3>Visited Places</h3>
          {data?.places && data.places.length > 0 ? (
            <div className="places-list">
              {data.places.map((place) => (
                <div key={place.id} className="place-item">
                  <div>
                    <span className="place-name">{place.spot_name}</span>
                    <span className="place-district"> - {place.district_name}</span>
                  </div>
                  {place.image && (
                    <img src={place.image} alt={place.spot_name} className="place-image" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-places">No visited places yet. Start exploring!</p>
          )}
        </div>

        <div className="wishlist-section">
          <div className="wishlist-header">
            <h3>Add Places to Visit</h3>
            <button 
              onClick={() => setShowSearch(!showSearch)} 
              className="toggle-search-btn"
            >
              {showSearch ? 'Hide Search' : 'Search Places'}
            </button>
          </div>
          
          {showSearch && (
            <div className="search-section">
              <input
                type="text"
                placeholder="Search by place name or district..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
                className="search-input"
              />
              
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((place) => (
                    <div key={place.id} className="search-result-item">
                      <div className="result-info">
                        <span className="result-name">{place.spot_name}</span>
                        <span className="result-district">{place.district_name}</span>
                      </div>
                      <button
                        onClick={() => handleAddToWishlist(place.id)}
                        className="add-wishlist-btn"
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
