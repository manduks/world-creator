import * as React from "react";
import Head from "next/head";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Island creator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Island creator 1.0 with react-virtualized" />
      </Head>
      <main>
        <section className="menu-selection">
          <h1>Island Creator</h1>
          <div className="selection-items">
            <Link href="/virtualized">
              <a>Virtualized</a>
            </Link>
            <Link href="/canvas">
              <a>Canvas</a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
