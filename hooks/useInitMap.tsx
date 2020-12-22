import * as React from 'react';
import { setWorld } from 'lib/world';
const BASE_URL = `https://blockchain.info/`;
const mockData = [
  'a8531c85fe5bf2779357cdd4ae446b1cb6cac059eb27ae16e4efb563db412b3f',
  'f30a4b59bbd4cd86af3142325d1668fb85cbc9539ba7f8681daaf6a96b7d7e09',
  'e8e46c4b22ee4b3975269493d1d4668120796d60df55f66db137f3379a283f99',
  'a170edaca5085c015589b33c1763bb7bb25a28751ff9e843d10a600d80f762d6',
  'de1dd60288990e68bdc2b9daf013f77e0c23217eb4f3c2dcbd279430a2c8f8da',
  'a2d48a216b5bb2f0e6e17aedece0d94d16e9e57b1b62a5ad4f11b8350354b653',
  'ee4d9ba924eff1c20091522f483cb2b0965002ccfe5991a7ba5519f67ec338b7',
  'b3ab5af5eaf6dd163c2a628c22cba467428555e2e6b549c250cfea687b307905',
  'eed6647903d6e7f5023d8547edc832c8541fd80a21a17b48a6ddb537605aee4e',
  'bb4a744f1d0046969b27319186e5db43d9feb29dcdc17f5c1a0dbcac23e59bd4',
  'f73c8637cffe6b689b45b5188f351803be67c474515d3f0c97732a006a99bef1',
  '6455d03c774ccddfd9b493ca3b5f9f817bb1fc317e7fcf8f0847c9ecf8226a57',
  'b40d54f68f33aab5ddff95a10d1be5d50dd58912a0a3606fd6fe566b07c2b07e',
  'ecbee89b085e2f1439c7472dc08cbbddb974704a100c6b7a1c031b070829a8fc',
  '16b4389100a736f99a1cd2bd846023a9fe22784d46702a53543ee5fd1d7814b7',
  '8f951628054003688b8b7d5c3faa48317327cc65d952b609693abd6b1545eb12',
  '307e6574814325e7adc609eba46b6d8d30957ce3815b0a7782f6fefd7f8d133a',
  '229bee8f1afe967c041d47c3893e3a9ad23aaed3624498ec4c15e16af19a7cbc',
  'f66fae00433a70ab8d13aa31048286e3a2e1a66bf3ef359cfae04eefa5dcc625',
  'e2727e8be560ccc104284104fd8e8837240ec24f462c089b5c30d3eb41c1996c',
  'a6c013068cf7f1ba6b2d30de609e22b5799f8fc16070756b8e1e6a418276d76e',
  'a3ea31864d18ccc5378f4c40b4366e7e0df375c24276a2bffc7668fdbe9d81c5',
  'f3a446a7259b195b05217d46cb84f3c7712ad8b5793e5da159b12e42e1655ddf',
  'a4153c00f213ef61b511129598452a170801abd6f6f526b18b765de940b36d7f',
  'ce1a82d0c85de942b66827d30411bb317a5d7cc2cdf4e9af377dde4157a79ce6',
  '197ca2b6438b7eaceaa37e1567c0c56535a5139f280d8c60dcedd5c03c099322',
  'b9253b7894451e75acbf9fa1b18e245bdc2205433835dc99e338b1ef3fc7874d',
  'e8ac3b56181138691736c5ed278b0e8744a7922f0a833fe0348fff44e5ca1b30',
  '480cb517a668708c6fb1195ad926db23d90e3b02a56f2022eff6aa5304d84f59',
  'fe6b870ce01eeb6e43e88d4be23dc27fb3dc36d15e76e7fe66865a2301970f8e',
  '5b6b3dfba0b41f8e86215e56df7c49592aad25be2b3b881d1a092c692592c4bd',
  'c6d0daf2825ec5baa584d2dc303d5c08f378e59c805fb334ffc693d7b7a84f88',
  'daaf9c17538e6f66853ccab5a2d177792d51085f02d3d360a0802ff843368eb2',
  '7fc61eb6d2a2d3ab472df5ac19358fbc0235e81728b95467ae953c453590c1b5',
  'c02ec4fc2054972c08a3e6b97b642b6154c2155d5016bc1cebfcbfd8603a1106',
  '4f951d4e63cf720611ee2edbba9b931b7db0e81d261c05b530c33f51d48b7a4d',
  '32efdc93c67da7f1fe6d39287c373554c597c8154a086f5813036922837691cc',
  '556b8be8b2f1a1d486f0955da16eb139e52245e53f693905b6a246cfc5f88cfa',
  'ec4e63657e6175091ec58b58ef4a26525b7b0d1bc691880ebda68bfd3d4aada5',
  'cbbd877d7f7373b515ba9160105a94ca21929d151fc709df49049048ab9c1db2',
  '26662aa628f09275e77ea29e25125258e67328d4ad33cabc7b9f8c3ee6d426e3',
  'd78dbb71140b03f5805669021a2719a672694d89abddb96f5138cb98a19661db',
  '25ce05cf488c5d2107c9e723703d9dc7b3e71186495ca7291e784a0c0abb2ece',
  '4cdbc6396407d3421efc64852e66ad32b96faf842bd33993590ecdd074712af6',
  'b6f85fba79d7e1942099eb2c3c1b64c110f8a5ab5a18c921a98fb8d426366add',
  '0df5e1dfc5b232d14c807697317a8d576330452be465c69206611d032f88b034',
  '735f4064fddf2fb3877b9498ce4358bf35869a88d09d45b82181130dd8273e3a',
  '8c66e9b9f573ca2a3c4d20b868a0cf9d542a24b77dd3044f7d4063a8a80c1b3f',
  'f84493a8efdeb00916919f3c103031d503a9b8ffd939b5a0f16711fc95a63d65',
  '5489a1f54c8b47fb4593ffa8114c4062b52488fe5c965ad5e5f67620182a8e65',
];

function parseData(dataSlice) {
  return dataSlice.map(({ hash }) => hash);
}

function createMap(hashes) {
  const map = {};
  hashes.forEach((hash, y) => {
    for (var x = 0; x < hash.length; x++) {
      map[`${x}_${y}`] = isNaN(Number(hash[x])) ? 1 : 0;
    }
  });
  setWorld({ ...map });
}

export default function useInitMap() {
  const [error, setError] = React.useState([]);
  const [isLoading, setIsLodaing] = React.useState(false);

  async function fetchData() {
    let hashData;
    let mapData;
    setIsLodaing(true);
    try {
      hashData = await fetch(`${BASE_URL}latestblock?cors=true`).then((res) =>
        res.json()
      );
    } catch (error) {
      setError(error);
    }
    if (hashData) {
      try {
        mapData = await fetch(
          `${BASE_URL}rawblock/${hashData.hash}?cors=true`
        ).then((res) => res.json());
      } catch (error) {
        setError(error);
      }
    }
    createMap(parseData(mapData.tx.slice(0, 10)));
    setIsLodaing(false);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return { error, isLoading };
}
