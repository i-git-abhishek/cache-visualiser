import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Cache Visualizer</div>
      <ul className="navbar-links">
        <li><Link to="/lru">LRU</Link></li>
        <li><Link to="/fifo">FIFO</Link></li>
        <li><Link to="/lfu">LFU</Link></li>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
