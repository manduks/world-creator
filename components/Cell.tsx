
import * as React from "react";
import { colors } from 'styles/colors';
import { world, calculateIslands } from 'lib/world';
import { useStatsDispatch, useStatsContext } from 'context/StatsContext';

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: object,
}

export default function Cell({ columnIndex, rowIndex, style }: CellProps) {
  const dispatch = useStatsDispatch();
  const memPosition = `${columnIndex}_${rowIndex}`;
  const [color, setColor] = React.useState(world[memPosition] || 0);
  // this is needed by react-virtualized to render the cell correctly
  style = {
    ...style,
    backgroundColor: colors[color],
  };
  return (
    <div
      className="cell"
      style={style}
      onClick={() => {
        const newValue = 1 - color; // toggle color between 0 and 1
        if (newValue) {
          world[memPosition] = newValue;
        } else { // clean up memory for easier loop later
          delete world[memPosition];
        }

        setColor(newValue);
        dispatch({
          type: 'square', 
          islandsCount: calculateIslands(),
          squaresCount: Object.keys(world).length,
        });
      }}
      onMouseEnter={() => { 
        dispatch({type: 'cursor', cursor:{ x: columnIndex, y: rowIndex}}); 
      }}
    ></div>
  );
}