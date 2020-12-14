import * as React from "react";
import Head from "next/head";
import SizeInput from 'components/SizeInput';
import Cursor from 'components/Cursor';
import Stats from 'components/Stats';
import { BOARD_SIZE } from 'components/GridWorld';
import CanvasWorld from 'components/CanvasWorld';
import { StatsProvider } from 'context/StatsContext';


export default function Canvas() {
  const [columns, setColumns] = React.useState(BOARD_SIZE);
  const [rows, setRows] = React.useState(BOARD_SIZE);

  function onChangeWidth(value) {
    setColumns(value);
  }

  function onChangeHeight(value) {
    setRows(value);
  }

  return (
    <StatsProvider>
      <div className="container">
        <Head>
          <title>Island creator</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Island creator 1.0 with canvas" />
        </Head>
        <main>
          <div className="header">
            <h1>Island Creator</h1>
            <span>Click on the canvas to start creating Islands</span>
          </div>

          <div className="world-container">
            <CanvasWorld rows={50} columns={50}/>
          </div>

          <footer>
            <Cursor/>
            <div className="footer-inputs">
              <SizeInput
                name="width"
                placeholder="width"
                value={columns}
                onChange={onChangeWidth}
                label="Width:"
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
