import * as React from "react";

export default function Stats() {
  const [squares, islands] = [12, 58];
  return (
    <div className="stats">
      <div>
        <span className="square"/> {squares} squares
      </div>
      <div>
        <span className="square island"/> {islands} islands
      </div>
    </div>
  )
}