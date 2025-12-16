import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    { title: "Custom Itineraries", desc: "Plan your trip exactly how you want." },
    { title: "Expert Guides", desc: "Get insights from local experts." },
    { title: "Affordable Packages", desc: "Best deals for every budget." },
  ];

  return (
    <section className="features" id="features">
      <h2>Why Choose Us</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
