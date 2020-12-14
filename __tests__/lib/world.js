import { walkTheWorld, setWorld, calculateIslands } from 'lib/world';

const worldMock = {
  "4_5": 1,
  "6_5": 1,
  "5_5": 1,
  "8_8": 1,
  "9_8": 1,
  "9_7": 1,
  "8_7": 1,
  "12_9": 1,
  "13_9": 1,
  "13_10": 1,
  "12_10": 1,
  "14_14": 1,
  "15_14": 1,
  "15_15": 1,
  "14_15": 1,
  "8_17": 1,
  "6_16": 1,
  "8_15": 1,
  "9_15": 1,
  "9_14": 1,
  "4_21": 1,
  "4_20": 1,
};

describe('walkTheWorld', () => {
  it('should return false when there is no land square on the world', () => {
    const value = walkTheWorld(0,0);
    expect(value).toBe(false);
  });
 
  it('should return false when is only one square of land', () => {
    setWorld({"7_5":1});
    const value = walkTheWorld(7,5);
    expect(value).toBe(false);
  });
  
  it('should return true when finding one island', () => {
    setWorld({"7_5":1,"8_5":1});
    const value = walkTheWorld(7,5);
    expect(value).toBe(true);
  });
});

describe('calculateIslands', () => {
  it('should return 5 islands', () => {
    setWorld(worldMock);
    const value = calculateIslands(4,5);
    expect(value).toBe(6);
  });
  
  it('should return 0 islands', () => {
    setWorld({"7_5":1});
    const value = calculateIslands(4,5);
    expect(value).toBe(0);
  });
});