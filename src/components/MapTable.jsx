import React from "react";
import "./MapTable.css";


export default function mapTable({ rows, capacity }) {
  return (
    <div className="map-table">
      <h3>Map <span className="muted">[ Cache Size: {capacity} ]</span></h3>
      {rows.length === 0 ? (
        <div className="empty">Map is empty.</div>
      ) : (
        <table>
          <thead>
            <tr><th>&lt;Key, Value&gt;</th><th>Node Address</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.key}>
                <td>&lt;{r.key}, {r.value}&gt;</td>
                <td>{r.addr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
