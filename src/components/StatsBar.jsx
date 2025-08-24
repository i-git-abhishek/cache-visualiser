import React from "react";
import "./StatsBar.css";

export default function StatsBar({ hits = 0, misses = 0, ratio = 0, size = 0, cap = 0 }) {
  return (
    <div className="stats">
      <div>Hits: <b>{hits}</b></div>
      <div>Misses: <b>{misses}</b></div>
      <div>Hit Ratio: <b>{ratio.toFixed(2)}</b></div>
      <div>Used: <b>{size}</b>/<b>{cap}</b></div>
    </div>
  );
}
