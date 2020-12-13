import * as React from "react";
import Head from "next/head";
import SizeInput from 'components/SizeInput';
import World, { BOARD_SIZE } from 'components/GridWorld';


export default function Home() {
  const [columns, setColumns] = React.useState(BOARD_SIZE);
  const [rows, setRows] = React.useState(BOARD_SIZE);

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
      <main>
        <h1>Welcome to World creator</h1>

        <SizeInput
          name="num-columns"
          placeholder="num columns"
          value={columns}
          onChange={onChangeWidth}
          label="Columns"
        ></SizeInput>
        <SizeInput
          name="num-columns"
          placeholder="num columns"
          value={rows}
          onChange={onChangeHeight}
          label="Rows"
        ></SizeInput>
        
        <World rows={rows} columns={columns}/>
      </main>
    </div>
  );
}
