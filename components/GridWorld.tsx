import * as React from "react";
import { Grid, AutoSizer } from "react-virtualized";
import Cell from 'components/Cell';

export const BOARD_SIZE = 100;
const CELL_SIZE = 40;
const PRE_RENDER_ITEMS = 10;

function cellRenderer(props) {
  return (
    <Cell
      key={props.key}
      columnIndex={props.columnIndex}
      rowIndex={props.rowIndex}
      style={props.style}
    />
  );
}

interface GridProps {
  rows: number;
  columns: number;
}

export default function GridWorld({ rows, columns }: GridProps) {
  const [forceRefresh, setForceRefresh] = React.useState(false);

  // refresh grid when dimensions change
  React.useEffect(() => {
    setForceRefresh(true);
    const timeout = setTimeout(() => {
      setForceRefresh(false);
    });

    return () => clearTimeout(timeout);
  }, [rows, columns]);
  
  return (
    <AutoSizer>
      {({ width, height }) => (
        forceRefresh ? null :
        <Grid
          cellRenderer={cellRenderer}
          columnCount={columns}
          columnWidth={CELL_SIZE}
          height={height}
          rowCount={rows}
          rowHeight={CELL_SIZE}
          width={width}
          scrollToColumn={10}
          scrollToRow={0}
          overscanColumnCount={PRE_RENDER_ITEMS}
          overscanRowCount={PRE_RENDER_ITEMS}
        />
      )}
    </AutoSizer>
  )
}