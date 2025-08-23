import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css"
function App() {
  return (
    <>
    <div className="app">
      <Navbar />
      <h1>Cache Visualizer</h1>
      <nav className="nav">
        <Link to="/lru">LRU</Link>
        <Link to="/fifo">FIFO</Link>
        <Link to="/lfu">LFU</Link>
      </nav>
      <p>Select a policy to visualize.</p>
    </div>
    </>
  );
}

export default App;
