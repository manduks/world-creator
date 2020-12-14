import * as React from "react";
import { Stage, Layer, Rect } from "react-konva";
import World, { BOARD_SIZE } from 'components/GridWorld';
import {BLUE, GREEN} from 'styles/colors'
const size = 50;

function createWorld(width, height) {
  const squares = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      squares.push({
        x,
        y,
        color: BLUE
      });
    }
  };
  return squares;
}


export default function Canvas({rows, columns}) {
  return (
    <Stage width={1200} height={1200}>
      <Layer>
        {createWorld(columns, rows).map(({x, y, color }) => 
          <Rect
            key={`${x}_${y}`}
            x={x * size}
            y={y * size}
            width={size}
            height={size}
            fill={color}
            shadowBlur={1}
            onClick={()=>{}}
          />
        )}
      </Layer>
    </Stage>
  );
}
