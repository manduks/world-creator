import * as React from 'react';
import Head from 'next/head';
import { Grid, AutoSizer } from 'react-virtualized';
const boardSize = 100;
const pixel = 40;
const preRender = 10;
const world = {};

function Input({
  label,
  name,
  onChange,
  placeholder,
  value = 0,
}) {
  return (
    <div>
      <label title={label}>
        {label}
      </label>
      <input
        aria-label={label}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
    )
}
const colors = ['#DBEAFE', '#34D399'];
let visited = {};

function walkTheWorld(x,y) {
  let hasMoreLand = false;
  visited[`${x}_${y}`] = true;

  //forward
  if (world[`${x+1}_${y}`] && !visited[`${x+1}_${y}`]) {
    // debugger;
    walkTheWorld(x+1, y);
    hasMoreLand = true;
  } 
  if(world[`${x}_${y+1}`] && !visited[`${x}_${y+1}`]) {
    // debugger;
    walkTheWorld(x, y+1);
    hasMoreLand = true;
  }

  //backwards
  if (world[`${x-1}_${y}`] && !visited[`${x-1}_${y}`]) {
    // debugger;
    walkTheWorld(x-1, y);
    hasMoreLand = true;
  } 
  if (world[`${x}_${y-1}`] && !visited[`${x}_${y-1}`]) {
    // debugger;
    walkTheWorld(x, y-1);
    hasMoreLand = true;
  }

  return hasMoreLand;
}


function isIsland(x,y) {
  return walkTheWorld(x,y);
}

function calculateIslands() {
  let islands = 0;
  visited = {};

  Object.keys(world).forEach(key => {
    const [x, y] = key.split('_');

    if(!visited[`${x}_${y}`]) {
      islands = isIsland(Number(x),Number(y), true) ? islands + 1 : islands;
      // debugger;
    }
  })
  console.log({islands});
}

function Cell({columnIndex, rowIndex, style}) {
  // const label = columnIndex === 0 ?  rowIndex : columnIndex;
  const memPosition = `${columnIndex}_${rowIndex}`;
  const [color, setColor] = React.useState(world[memPosition] || 0);
  // this is needed by react-virtualized to render the cel correctly
  style = {
    ...style,
    backgroundColor: colors[color],
  };
  return (
    <div className="cell" style={style}  onClick={()=>{
      const newValue = 1 - color;
      setColor(newValue);
      // clean up memory for easier loop later
      if(newValue) {
        world[memPosition] = newValue;
      } else {
        delete world[memPosition];
      }
      setTimeout(() => {
        calculateIslands();
      }, 200);
    }}></div>
  );
}

function cellRenderer({columnIndex, key, rowIndex, style}) {
  return <Cell key={key} style={style} columnIndex={columnIndex} rowIndex={rowIndex} style={style}/>
}

export default function Home() {
  const [columns, setColumns] = React.useState(boardSize);
  const [rows, setRows] = React.useState(boardSize);

  function onChangeWidth(event) {
    setColumns(parseInt(event.target.value, 10) || 1);
  }

  function onChangeHeight(event) {
    setRows(parseInt(event.target.value, 10) || 1);
  }

  return (
    <div>
      <Head>
        <title>World creator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <h1>
          Welcome to World creator
        </h1>

        <Input name="num-columns" placeholder="num columns" value={columns} onChange={onChangeWidth} label="Columns"></Input>
        <Input name="num-columns" placeholder="num columns" value={rows} onChange={onChangeHeight} label="Rows"></Input>
        <AutoSizer>
          {({width}) => (
              <Grid
                cellRenderer={cellRenderer}
                columnCount={columns}
                columnWidth={pixel}
                height={900}
                rowCount={rows}
                rowHeight={pixel}
                width={width}
                scrollToColumn={10}
                scrollToRow={0}
                overscanColumnCount={preRender}
                overscanRowCount={preRender}
              />
            )}
        </AutoSizer> 
      </main>
    </div>
  )
}
