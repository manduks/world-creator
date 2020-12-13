
import * as React from "react";
import { colors } from 'styles/colors';
import { world, calculateIslands } from 'lib/world';

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: object,
}

export default function Cell({ columnIndex, rowIndex, style }: CellProps) {
  const memPosition = `${columnIndex}_${rowIndex}`;
  const [color, setColor] = React.useState(world[memPosition] || 0);

  // this is needed by react-virtualized to render the cel correctly
  style = {
    ...style,
    backgroundColor: colors[color],
  };
  return (
    <div
      className="cell"
      style={style}
      onClick={() => {
        const newValue = 1 - color;
        setColor(newValue);
        // clean up memory for easier loop later
        if (newValue) {
          world[memPosition] = newValue;
        } else {
          delete world[memPosition];
        }
         console.log(calculateIslands());
      }}
    ></div>
  );
}