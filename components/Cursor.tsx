import * as React from "react";
import { useStatsContext } from 'context/StatsContext';

export default function Cursor() {
  const { cursor } = useStatsContext()
  const { x, y } = cursor;
  
  return (
    <div className="cursor">
      <span>x : {x}</span>
      <span>y : {y}</span>
    </div>
  )
}