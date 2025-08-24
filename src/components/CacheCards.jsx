import React from "react";
import { Link } from "react-router-dom";
import LRUimg from "../assets/LRUimg.webp";
import LFUimg from "../assets/LFUimg.webp";
import FIFOimg from "../assets/FIFOimg.webp";
import "./CacheCards.css";

const cacheCards = [
  {
    title: "LRU Cache",
    description: "Evicts the least recently used block first.",
    color: "#6366f1",
    image: LRUimg,
    link: "/lru",
  },
  {
    title: "LFU Cache",
    description: "Evicts the least frequently used block first.",
    color: "#3b82f6",
    image: LFUimg,
    link: "/lfu",
  },
  {
    title: "FIFO Cache",
    description: "Evicts the first inserted block.",
    color: "#10b981",
    image: FIFOimg,
    link: "/fifo",
  },
];

export default function CacheCards() {
  return (
    <div className="cards-container">
      {cacheCards.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{ backgroundColor: card.color }}
        >
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-title">{card.title}</div>
          <div className="card-description">{card.description}</div>
          <Link to={card.link} className="card-button">
            Simulate
          </Link>
        </div>
      ))}
    </div>
  );
}
