import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CacheList.css";

export default function cacheList({ items = [] }) {
  function SentinelBlock({text}){
    return(
      <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="sentinel"
              title="Most recently used is closest to H"
            >
              {text}
            </motion.div>
    );
  }

  return (
    <div className="cache-list">
      <SentinelBlock text = "H" />
      <div className="nodes">
        <AnimatePresence mode="wait">
          {items.map(({key, value, freq}) => (
            <motion.div
              key={key}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="node"
              title="Most recently used is closest to H"
            >
              <div className="node-key">{key}</div>
              <div className="node-value">{value}</div>
              {freq !== undefined && (
                <div className="node-freq">freq: {freq}</div>
                 )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <SentinelBlock text="T" />
    </div>
  );
}
