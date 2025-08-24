import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CacheCards from "./components/CacheCards";
import "./App.css"
function App() {
  return (
    <>
    <div className="app">
      <Navbar />
      <h1>Cache Visualiser: Select a policy to visualise</h1>
      <nav className="nav">
        <CacheCards />
      </nav>
    </div>
    </>
  );
}

export default App;
