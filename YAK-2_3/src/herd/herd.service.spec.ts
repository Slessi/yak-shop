import { HerdService } from './herd.service';

describe('HerdService', () => {
  it.each<number>([13, 14, 200])('calculates expected values', (T) => {
    expect(new HerdService().getHerd(T)).toMatchSnapshot();
  });
});
