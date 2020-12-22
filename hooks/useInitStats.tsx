import * as React from 'react';
import { calculateIslands, world } from 'lib/world';
import { useStatsDispatch } from 'context/StatsContext';

export default function useInitStats(isLoading) {
  const dispatch = useStatsDispatch();

  React.useEffect(() => {
    if (!isLoading) {
      dispatch({
        type: 'square',
        islandsCount: calculateIslands(),
        squaresCount: Object.keys(world).length,
      });
    }
  }, [isLoading]);
}
