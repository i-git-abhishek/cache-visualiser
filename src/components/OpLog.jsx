import React from "react";
import "./OpLog.css";


export default function opLog({ log }) {
  return (
    <div className="oplog">
      <h3>Recent Operations</h3>
      <ul>
        {log.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    </div>
  );
}
