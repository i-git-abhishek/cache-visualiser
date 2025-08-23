import React, { useState, useMemo } from "react";
import LRUCache from "../components/LRUDataStructure";
import ControlPanel from "../components/ControlPanel"
import CacheList from "../components/CacheList"
import MapTable from "../components/MapTable"
import StatsBar from "../components/StatsBar"
import OpLog from "../components/OpLog"
import "./LRU.css"
import Navbar from "../components/Navbar";

function LRU() {
  const [capacity, setCapacity] = useState(3);
  const cache = useMemo(() => new LRUCache(capacity), [capacity]);

  const [listState, setListState] = useState(cache.currentState());
  const [mapState, setMapState] = useState(cache.mapSnapshot());
  const [opLog, setOpLog] = useState([]);

  const refresh = (label) => {
    setListState([... cache.currentState()]);
    setMapState([... cache.mapSnapshot()]);
    setOpLog((prev) => [label, ...prev].slice(0, 20));

    setHits(cache.hits);
    setMisses(cache.miss);
  };

  const onPut = (k, v) => {
    const beforeSize = cache.size();
    cache.put(k, v);
    const afterSize = cache.size();
    refresh(`put(${k}, ${v})`);
  };

  const onGet = (k) => {
    const val = cache.get(k);
    refresh (val === -1 ?  `get(${k}) -> miss` : `get(${k}) -> ${val}`);
  }

  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  return (
    <div className="LRU">
      <Navbar />
      <h1>LRU Cache Visualizer</h1>

        <CacheList items = {listState}/>
        <div className="main-pane">
          <div className="left-pane">
            <div className="control-panel">
              <ControlPanel
                capacity={capacity}
                setCapacity={setCapacity}
                onPut={onPut}
                onGet={onGet}
                />
            </div>
            <div className="map-stats-row">
              <div className="map-table">
                <MapTable rows={mapState} capacity={capacity} />
              </div>
              <div className="stats-bar">
                <StatsBar
                  hits={hits}
                  misses={misses}
                  ratio={cache.hitRatio()}
                  size={cache.size()}
                  cap={capacity}
                />
              </div>
            </div>
          </div>
          <div className="op-log">
            <OpLog log={opLog} />
          </div>
        </div>


    </div>
  );
}

export default LRU;
