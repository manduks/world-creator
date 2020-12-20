import * as React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from '@testing-library/react';
import { StatsProvider } from 'context/StatsContext';
import { MAX_VALUE, MIN_VALUE } from 'components/SizeInput';
import { isWorldEmpty } from 'lib/world';
import { newWorld } from 'hooks/useRequest';
import Index from '../pages/index';

describe('<Index Page />', () => {
  // code for AutoSizer
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  );

  beforeEach(() => {
    jest.useFakeTimers();
    fetch.resetMocks();
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
    jest.useRealTimers();
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth
    );
  });

  it('renders and tests component', async () => {
    fetch.mockResponseOnce(JSON.stringify(newWorld));
    render(
      <StatsProvider>
        <Index />
      </StatsProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByText('loading ...'));
    await waitFor(() => {
      expect(screen.getByLabelText('Width:')).toBeInTheDocument();
    });

    const widthInput = screen.getByLabelText('Width:');
    const heigthInput = screen.getByLabelText('Height:');

    fireEvent.change(widthInput, { target: { value: '10' } });
    fireEvent.change(heigthInput, { target: { value: '10' } });
    act(() => jest.advanceTimersByTime(100));

    const allCells = screen.getAllByTestId('grid-cell');
    expect(allCells.length).toBe(20);
    // create islands
    expect(screen.getByText('0 squares')).toBeTruthy();
    expect(screen.getByText('0 islands')).toBeTruthy();
    fireEvent.click(allCells[0]);
    expect(screen.getByText('1 squares')).toBeTruthy();
    expect(screen.getByText('1 islands')).toBeTruthy();
    fireEvent.click(allCells[1]);
    expect(screen.getByText('2 squares')).toBeTruthy();
    expect(screen.getByText('1 islands')).toBeTruthy();
    fireEvent.mouseOver(allCells[0]);
    expect(screen.getByText('x : 8')).toBeTruthy();
    expect(screen.getByText('y : 0')).toBeTruthy();
    expect(isWorldEmpty()).toBe(false);

    // clean grid
    fireEvent.change(widthInput, { target: { value: '100' } });
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByText('0 squares')).toBeTruthy();
    expect(screen.getByText('0 islands')).toBeTruthy();
    expect(isWorldEmpty()).toBe(true);
  });

  it('renders and fires inputs validations', async () => {
    fetch.mockResponseOnce(JSON.stringify(newWorld));
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <StatsProvider>
        <Index />
      </StatsProvider>
    );
    await waitForElementToBeRemoved(() => screen.queryByText('loading ...'));
    await waitFor(() => {
      expect(screen.getByLabelText('Width:')).toBeInTheDocument();
    });
    const widthInput = screen.getByLabelText('Width:');

    fireEvent.change(widthInput, { target: { value: '1000000' } });
    expect(window.alert).toBeCalledWith(
      `Oops, max value allowed is ${MAX_VALUE}`
    );

    fireEvent.change(widthInput, { target: { value: '0' } });
    expect(window.alert).toBeCalledWith(
      `Oops, min value allowed is ${MIN_VALUE}`
    );
  });
});
