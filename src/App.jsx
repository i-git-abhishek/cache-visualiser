import React from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      {/* Later: add CacheList, ControlPanel, MapTable, StatsBar, OpLog */}
      <main className="main-content">
        <p>Welcome! Choose a cache policy and start visualizing.</p>
      </main>
    </div>
  );
}

export default App;
