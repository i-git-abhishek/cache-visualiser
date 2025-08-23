import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Cache Visualizer</h1>
      <p className="subtitle">Explore cache replacement policies interactively</p>
    </header>
  );
}
