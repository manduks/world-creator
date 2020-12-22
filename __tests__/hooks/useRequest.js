import { renderHook } from '@testing-library/react-hooks';
import useRequest, { newWorld } from 'hooks/useRequest';

describe('useRequest', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render component correctly', async () => {
    fetch.mockResponseOnce(JSON.stringify(newWorld));
    const { result, waitForNextUpdate } = renderHook(() => useRequest());
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(newWorld);
  });
});
