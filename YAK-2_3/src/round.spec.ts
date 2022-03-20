import { round } from './round';

describe('round', () => {
  it.each<[number, number, number?]>([
    [10.283798759834, 10.28, undefined],
    [0.999934, 1, undefined],
    [2.5, 2.5, undefined],
    [2.5, 3, 0],
  ])('%# - for input %f should round to %f with dp %i', (input, output, dp) => {
    expect(round(input, dp)).toBe(output);
  });
});
