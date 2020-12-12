import * as React from 'react';
import Head from 'next/head';
import { Grid, AutoSizer } from 'react-virtualized';
const boardSize = 10;
const pixel= 40;
const preRender = 50;

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

function cellRenderer({columnIndex, key, rowIndex, style}) {
  const label = columnIndex === 0 ?  rowIndex : columnIndex;
  style = {
    ...style,
    border: '1px solid green',
  };
  return (
    <div key={key} style={style} onClick={()=>alert(rowIndex)}>
      {label}
    </div>
  );
}

function noContentRenderer() {
  return <div className={styles.noCells}></div>;
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
