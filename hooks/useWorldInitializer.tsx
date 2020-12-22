import * as React from 'react';
import { calculateIslands, world, parseWorld } from 'lib/world';
import { useStatsDispatch } from 'context/StatsContext';
import { CoordinatesArray } from 'types/world';

export default function useWorldInitializer(data: CoordinatesArray) {
  const dispatch = useStatsDispatch();
  React.useEffect(() => {
    parseWorld(data);
    dispatch({
      type: 'square',
      islandsCount: calculateIslands(),
      squaresCount: Object.keys(world).length,
    });
  }, [data.toString()]);
}
