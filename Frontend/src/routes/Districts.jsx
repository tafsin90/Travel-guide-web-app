import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Card.css'

function Districts() {

    const [districts, setDistricts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/districts')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch districts')
                }
                return res.json()
            })
            .then(data => {
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
            setDistricts(sorted);
        })
        .catch(err => {
            console.error('Error fetching districts:', err)
        })
    }, [])

    const navigate = useNavigate()

    return (
        <div className="country2">
            {districts.map(d => (
                <div className="card2" key={d.id} onClick={() => navigate(`/districts/${d.id}`)}>
                    <div className="card-image2">
                        <img src={d.image_url} alt={d.name} />
                    </div>
                    <div className="card-details2">
                        <div className="spot2">{d.name}</div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Districts
