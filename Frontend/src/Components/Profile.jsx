import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => setData(res.data))
  }, [])

  if (!data) return null

  return (
    <div>
      <h2>Total Visited: {data.totalVisited}</h2>
      {data.places.map(p => (
        <p key={p.spot_name}>{p.spot_name} - {p.district}</p>
      ))}
    </div>
  )
}
