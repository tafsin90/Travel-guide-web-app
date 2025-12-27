import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/Card.css'

function DistrictPlaces() {
  const { id } = useParams()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/districts/${id}/spots`)
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(err => console.error(err))
  }, [id])

  return (
    <div className="district-spot">
      {places.map(place => (
        <div className="card2" key={place.id}>
          <div className="card-image2">
            <img src={place.image} alt={place.spot_name} />

          </div>
          <div className="card-details2">
            <div className="spot2">{place.spot_name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DistrictPlaces
