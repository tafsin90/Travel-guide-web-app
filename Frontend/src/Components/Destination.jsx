import React from 'react';
import '../Styles/Destinations.css';

const Destinations = () => {
  const places = [
    { name: "Paris", img: "https://source.unsplash.com/400x300/?paris" },
    { name: "Bali", img: "https://source.unsplash.com/400x300/?bali" },
    { name: "Tokyo", img: "https://source.unsplash.com/400x300/?tokyo" },
    { name: "New York", img: "https://source.unsplash.com/400x300/?newyork" },
  ];

  return (
    <section className="destinations" id="destinations">
      <h2>Popular Destinations</h2>
      <div className="dest-grid">
        {places.map((place, index) => (
          <div className="dest-card" key={index}>
            <img src={place.img} alt={place.name} />
            <h3>{place.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;
