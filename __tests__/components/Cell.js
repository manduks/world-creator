import * as React from 'react'
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import Cell from 'components/Cell'
import { StatsProvider } from 'context/StatsContext';
import { GREEN, BLUE } from 'styles/colors';

describe('<Cell />', () => {
  it('renders component', () => {
    const tree = renderer.create(
      <StatsProvider>
        <Cell />    
      </StatsProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  });

  it('renders component with context and verifies click event', () => {
    render(
      <StatsProvider>
        <Cell />    
      </StatsProvider>
    );
    fireEvent.click(screen.getByTestId('grid-cell'));
    expect(screen.getByTestId('grid-cell')).toHaveStyle(`background-color: ${GREEN}`);
    fireEvent.click(screen.getByTestId('grid-cell'));
    expect(screen.getByTestId('grid-cell')).toHaveStyle(`background-color: ${BLUE}`);
  });
});
