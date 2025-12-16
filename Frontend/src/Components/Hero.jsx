import React, { useState } from 'react';
import '../Styles/hero.css';

const Hero = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const places = ["Cox's Bazar", "Sajek Valley", "Sundarbans", "Srimangal"];

  const handleSearch = () => {
    const found = places.find(place => place.toLowerCase() === query.toLowerCase());
    if (found) {
      setResult(`Information about ${found} will be displayed here.`);
    } else {
      setResult("We don't have information of this place");
    }
  };

  return (
    <section className="hero">
      <div className="hero-content" id="Home">
        <h1>Explore the World with TravelGuide</h1>
        <h2>Every journey deserves clarity.</h2>
        <p>
          This guide helps travelers move from curiosity to confident exploration — discovering places, 
          understanding routes, and knowing what lies beyond the map. Choose where you want to go, 
          and travel with purpose. Your adventure starts here. Find the best destinations, tips, and guides.
        </p>
        <button className="hero-btn">Get Started</button>

        {/* Search bar directly in Hero */}
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {result && <p className="search-result">{result}</p>}

        {/* Contact button */}
        <div className="contact-btn">
          Contact us
          <span className="down-arrow">&#8595;</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
