import React from 'react';
import '../Styles/navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">TravelGuide</div>
      <ul className="nav-links">
        <li><a href="#Home">Home</a></li>
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <ul className="nav-links">
        <li><a href="#Home">login</a></li>
        <li><a href="#destinations">Sign up</a></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
