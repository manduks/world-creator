import * as React from "react";
import Head from "next/head";
import SizeInput from "components/SizeInput";
import Cursor from "components/Cursor";
import Stats from "components/Stats";
import World, { BOARD_SIZE } from "components/GridWorld";
import { setWorld } from "lib/world";
import { useStatsDispatch } from "context/StatsContext";
import useRequest from "hooks/useRequest";
import useWorldInitializer from "hooks/useWorldInitializer";

function resetWorld(dispatch: Function): void {
  dispatch({ type: "reset" });
  setWorld({});
}

export default function Home() {
  const [columns, setColumns] = React.useState(BOARD_SIZE);
  const [rows, setRows] = React.useState(BOARD_SIZE);
  const { data, isLoading } = useRequest();
  const dispatch = useStatsDispatch();

  useWorldInitializer(data);

  function onChangeWidth(value) {
    resetWorld(dispatch);
    setColumns(value);
  }

  function onChangeHeight(value) {
    resetWorld(dispatch);
    setRows(value);
  }

  return (
    <div className="container">
      <Head>
        <title>Island creator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Island creator 1.0" />
        <meta property="og:image" content="/poster.png" />
      </Head>
      <main>
        {isLoading ? (
          <div className="loading">loading ...</div>
        ) : (
          <>
            <div className="header">
              <h1>Island Creator</h1>
              <span>Click on the canvas to start creating Islands</span>
            </div>
            <div className="world-container">
              <World rows={rows} columns={columns} />
            </div>
            <footer>
              <Cursor />
              <div className="footer-inputs">
                <SizeInput
                  name="width"
                  placeholder="width"
                  value={columns}
                  onChange={onChangeWidth}
                  label="Width:"
                />
                <SizeInput
                  name="height"
                  placeholder="height"
                  value={rows}
                  onChange={onChangeHeight}
                  label="Height:"
                />
              </div>
              <Stats />
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
