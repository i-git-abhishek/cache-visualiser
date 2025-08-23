import React from "react";
import "./StatsBar.css";


export default function statsBar({ hits, misses, ratio, size, cap }) {
  return (
    <div className="stats">
      <div>Hits: <b>{hits}</b></div>
      <div>Misses: <b>{misses}</b></div>
      <div>Hit Ratio: <b>{ratio.toFixed(2)}</b></div>
      <div>Used: <b>{size}</b>/<b>{cap}</b></div>
    </div>
  );
}
