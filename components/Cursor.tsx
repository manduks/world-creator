import * as React from "react";

export default function Cursor() {
  const [x, y] = [12, 58];
  return (
    <div className="cursor">
      <span>x : {x}</span>
      <span>y : {y}</span>
    </div>
  )
}