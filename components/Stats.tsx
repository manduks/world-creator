import * as React from "react";
import { useStatsContext } from 'context/StatsContext';

export default function Stats() {
  const { squaresCount, islandsCount } = useStatsContext()

  return (
    <div className="stats">
      <div>
        <span className="square"/> {squaresCount} squares
      </div>
      <div>
        <span className="square island"/> {islandsCount} islands
      </div>
    </div>
  )
}