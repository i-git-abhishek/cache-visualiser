import {React , useState} from "react";
import "./ControlPanel.css";

export default function ControlPanel({ capacity, setCapacity, onPut ,onGet}) {
    const [op, setOp] = useState("put");
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const run = () => {
        const k = Number(key);
        if(Number.isNaN(k)) return;
        if(op === "put"){
            const v = Number(value);
            if(Number.isNaN(v)) return;
            onPut(k, v);
        }
        else{
            onGet(k);
        }

        setKey("");
        setValue("");
    };

    return(
        <div className="control-panel">
            <div className="row">
                <label> <input type="radio" checked={op=="put"} onChange={() => setOp("put")} /> PUT</label>
                <label> <input type="radio" checked={op=="get"} onChange={() => setOp("get")} /> GET</label>
            </div>

            <div className="row">
                <input placeholder="Key" value={key} onChange={e=>setKey(e.target.value)} />
                {op==="put" && <input placeholder="Value" value={value} onChange={e=>setValue(e.target.value)} />}
                <button onClick={run}>GO</button>
            </div>
            <div className="capacity-box">
                <label>Capacity: </label>
                <input
                    type="number"
                    min={0}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value || 0))}
                />
            </div>
        </div>
    );
}