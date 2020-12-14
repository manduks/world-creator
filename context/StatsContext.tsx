import * as React from "react";
import { Coordinates } from 'types/world';

type StatsProviderProps = {children: React.ReactNode}
interface StatsInterface {
  cursor?: Coordinates;
  squaresCount?: number;
  islandsCount?: number;
}
interface Action extends StatsInterface { 
  type: 'cursor'| 'square'
}
type Dispatch = (action: Action) => void

const initialState = {
  cursor: {
    x: 0,
    y: 0,
  },
  squaresCount: 0,
  islandsCount: 0,
};

const StatsContext = React.createContext<StatsInterface | undefined>(undefined);
const StatsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function statsReducer(state: StatsInterface, action: Action) {
  switch (action.type) {
    case 'cursor': {
      return { ...state, cursor: action.cursor };
    }
    case 'square': {
      return { ...state, squaresCount: action.squaresCount, islandsCount:  action.islandsCount,};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function StatsProvider({ children }: StatsProviderProps) {
  const [state, dispatch] = React.useReducer(statsReducer, initialState);

  return (
    <StatsContext.Provider value={state}>
      <StatsDispatchContext.Provider value={dispatch}>
        {children}
      </StatsDispatchContext.Provider>
    </StatsContext.Provider>
  )
}
function useStatsContext() {
  const context = React.useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStatsContext must be used within a CountProvider')
  }
  return context;
}

function useStatsDispatch() {
  const context = React.useContext(StatsDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context;
}

export {StatsProvider, useStatsContext, useStatsDispatch}

