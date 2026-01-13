import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../Styles/Card.css'

function DistrictPlaces() {
  const { id } = useParams()
  const [places, setPlaces] = useState([])
  const [favorite, setFavorite] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [visited, setVisited] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/districts/${id}/spots`)
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(err => console.error(err))
  }, [id])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // if logged in, load from backend profile
      fetch('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setVisited((data.places || []).map(p => p.id))
          setWishlist((data.wishlist || []).map(p => p.id))
        })
        .catch(() => {
          setFavorite(JSON.parse(localStorage.getItem('favorite') || '[]'))
          setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'))
          setVisited(JSON.parse(localStorage.getItem('visited') || '[]'))
        })
    } else {
      setFavorite(JSON.parse(localStorage.getItem('favorite') || '[]'))
      setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'))
      setVisited(JSON.parse(localStorage.getItem('visited') || '[]'))
    }
  }, [])

  const toggle = async (list, setList, key, e, spotId) => {
    e.preventDefault()
    e.stopPropagation()

    const token = localStorage.getItem('token')

    if (token && (key === 'wishlist' || key === 'visited')) {
      if (list.includes(spotId)) {
        alert('Already added')
        return
      }

      const endpoint = key === 'wishlist' ? '/api/user/wishlist' : '/api/user/visited'

      try {
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ spotId })
        })

        const body = await res.json()
        if (!res.ok) {
          alert(body.message || 'Failed to add')
          return
        }

        const newList = [...list, spotId]
        setList(newList)
        localStorage.setItem(key, JSON.stringify(newList))
      } catch (err) {
        console.error('Toggle error', err)
        alert('Network error')
      }
    } else {
      // local-only behavior
      let newList = []
      if (list.includes(spotId)) {
        newList = list.filter(x => x !== spotId)
      } else {
        newList = [...list, spotId]
      }
      setList(newList)
      localStorage.setItem(key, JSON.stringify(newList))
    }
  }

  return (
    <div className="district-spot">
      {places.map(place => (
        <div className="card2-wrapper" key={place.id}>
          <Link to={`/spots/${place.id}`} className="card2">
            <div className="card-image2">
              <img src={place.image} alt={place.spot_name} />
            </div>
            <div className="card-details2">
              <div className="spot2">{place.spot_name}</div>
            </div>
          </Link>
          <div className="card-actions">
            <button 
              className={`action-btn ${favorite.includes(place.id) ? 'active' : ''}`}
              onClick={(e) => toggle(favorite, setFavorite, 'favorite', e, place.id)}
            >
              <span className="icon">❤️</span>
            </button>
            <button 
              className={`action-btn ${wishlist.includes(place.id) ? 'active' : ''}`}
              onClick={(e) => toggle(wishlist, setWishlist, 'wishlist', e, place.id)}
            >
              <span className="icon">⭐</span>
            </button>
            <button 
              className={`action-btn ${visited.includes(place.id) ? 'active' : ''}`}
              onClick={(e) => toggle(visited, setVisited, 'visited', e, place.id)}
            >
              <span className="icon">✓</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DistrictPlaces
