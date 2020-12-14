import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Index from '../pages/index';
import { MAX_VALUE, MIN_VALUE } from 'components/SizeInput';

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
    const heigthInput = screen.getByLabelText('Height:')
    fireEvent.change(widthInput, { target: { value: '10' } });
    fireEvent.change(heigthInput, { target: { value: '10' } });
    expect(screen.getAllByTestId('grid-cell').length).toBe(100);
    
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
    fireEvent.mouseOver(allCells[1]);
    expect(screen.getByText('x : 1')).toBeTruthy();
    expect(screen.getByText('y : 0')).toBeTruthy();
  });
 
  it('renders and fires inputs validations', async () => {
    // const jsdomAlert = window.alert;  // remember the jsdom alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <Index />
    );
    const widthInput = screen.getByLabelText('Width:');

    fireEvent.change(widthInput, { target: { value: '1000000' } });
    expect(window.alert).toBeCalledWith(`Oops, max value allowed is ${MAX_VALUE}`)

    fireEvent.change(widthInput, { target: { value: '0' } });
    expect(window.alert).toBeCalledWith(`Oops, min value allowed is ${MIN_VALUE}`)
  });
});