import * as React from "react";
import Head from "next/head";
import SizeInput from 'components/SizeInput';
import Cursor from 'components/Cursor';
import Stats from 'components/Stats';
import World, { BOARD_SIZE } from 'components/GridWorld';
import { StatsProvider } from 'context/StatsContext';


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
    <StatsProvider>
      <div className="container">
        <Head>
          <title>World creator</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="header">
            <h1>Island Creator</h1>
            <span>Click on the canvas to start creating Islands</span>
          </div>
          <div className="world-container">
            <World rows={rows} columns={columns}/>
          </div>
          <footer>
            <Cursor/>
            <div className="footer-inputs">
              <SizeInput
                name="width"
                placeholder="width"
                value={columns}
                onChange={onChangeWidth}
                label="Width: "
              ></SizeInput>
              <SizeInput
                name="height"
                placeholder="height"
                value={rows}
                onChange={onChangeHeight}
                label="Height:"
              ></SizeInput>
            </div>
            <Stats />
          </footer>
        </main>
      </div>
    </StatsProvider>
  );
}
