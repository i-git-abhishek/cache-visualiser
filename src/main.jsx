import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LRU from "./policies/LRU.jsx";  
import LFU from "./policies/LFU.jsx";  
// import FIFO from "./policies/FIFO.jsx";  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lru" element={<LRU />} />
        <Route path="/lfu" element={<LFU />} />
        {/* <Route path="/fifo" element={<FIFO />} />
        <Route path="/lfu" element={<LFU />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
