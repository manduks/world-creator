import * as React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'
import { StatsProvider } from 'context/StatsContext';

it('renders homepage unchanged', () => {
  const tree = renderer.create(
    <StatsProvider>
      <Index />
    </StatsProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})