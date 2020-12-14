import * as React from "react";
import { useStatsContext } from 'context/StatsContext';

export default function Stats() {
  const { squaresCount, islandsCount } = useStatsContext()

  return (
    <div className="stats">
      <div data-testid="stats-squares">
        <span className="square"/> {squaresCount} squares
      </div>
      <div>
        <span data-testid="stats-islands"/> {islandsCount} islands
      </div>
    </div>
  )
}