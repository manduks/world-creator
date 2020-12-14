import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import Index from '../pages/index'

describe('<Index Page />', () => {
  // code for AutoSizer
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 50 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
  });

  it('renders and tests component', () => {
    render(
      <Index />
    );
    const widthInput = screen.getByLabelText('Width:')
    const heigthInput = screen.getByLabelText('Width:')
    fireEvent.change(widthInput, { target: { value: '10' } });
    fireEvent.change(heigthInput, { target: { value: '10' } });
    expect(screen.getAllByTestId('grid-cell').length).toBe(120); // 20 more for vitualization
    
    // create islands
    const allCells = screen.getAllByTestId('grid-cell');
    expect(screen.getByText('0 squares')).toBeTruthy();
    expect(screen.getByText('0 islands')).toBeTruthy();
    fireEvent.click(allCells[0]);
    expect(screen.getByText('1 squares')).toBeTruthy();
    expect(screen.getByText('0 islands')).toBeTruthy();
    fireEvent.click(allCells[1]);
    expect(screen.getByText('2 squares')).toBeTruthy();
    expect(screen.getByText('1 islands')).toBeTruthy();
  });
});