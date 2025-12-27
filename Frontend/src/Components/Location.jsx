import React from 'react'
import '../Styles/Card.css'
import '../Styles/Location.css'
import bangladeshImg from '../images/Bangladesh-1_cropped_processed_by_imagy.jpg'
import GlobalImg from '../images/worldWide_cropped_processed_by_imagy.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Location() {
    const navigate = useNavigate()
    return (
        <div className='location'>
            <p className='heading-lock'>"The world opens up when you choose to explore it slowly."</p>
            <p className='choose-lock'>Select a country to explore</p>

            <div className='country'>
                <div className='card' onClick={() => navigate('/bangladesh')}>
                    <div className="card-image">
                        <img src={bangladeshImg} alt="Bangladesh" />
                    </div>
                    <div className='card-details'>
                        <div className="spot"> Bangladesh </div>
                        <div className="heading-card"> Discover the beaches, culture, and flavors of Bangladesh</div>
                    </div>
                </div>


                <div className='card'>
                    <div className="card-image">
                        <img src={GlobalImg} alt="Global" />
                    </div>
                    <div className='card-details'>
                        <div className="spot"> Other country </div>
                        <div className="heading-card"> Travel the world and explore hidden gems everywhere</div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Location