import * as React from 'react';
const BASE_URL = 'http://swapi.dev/api/';

export const newWorld = [
  [0, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [2, 2],
  [3, 1],
  [3, 2],
  [3, 3],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
];

export default function useRequest(query = 'people/1') {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fecthData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${query}`);
      if (response.status === 200) {
        const data = await response.json();
        setData(newWorld);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fecthData();
  }, []);

  return { data, isLoading };
}
