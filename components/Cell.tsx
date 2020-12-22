import * as React from 'react';
import { colors } from 'styles/colors';
import { getWorld, calculateIslands, setLand, deleteLand } from 'lib/world';
import { useStatsDispatch } from 'context/StatsContext';

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: object;
}

export default function Cell({ columnIndex, rowIndex, style }: CellProps) {
  const dispatch = useStatsDispatch();
  const memPosition = `${columnIndex}_${rowIndex}`;
  const world = getWorld();
  const [color, setColor] = React.useState(world[memPosition] || 0);

  // debugger;
  // this is needed by react-virtualized to render the cell correctly
  style = {
    ...style,
    backgroundColor: colors[color],
  };

  return (
    <div
      className="cell"
      data-testid="grid-cell"
      style={style}
      onClick={() => {
        const newValue = 1 - color; // toggle color between 0 and 1
        debugger;
        if (newValue) {
          setLand(memPosition, newValue);
        } else {
          // clean up memory for easier loop later
          deleteLand(memPosition);
        }
        setColor(newValue);
        dispatch({
          type: 'square',
          islandsCount: calculateIslands(),
          squaresCount: Object.keys(world).length,
        });
      }}
      onMouseEnter={() => {
        dispatch({ type: 'cursor', cursor: { x: columnIndex, y: rowIndex } });
      }}
    ></div>
  );
}
