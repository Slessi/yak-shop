import { HerdService } from './herd.service';

describe('HerdService', () => {
  it.each<number>([13, 14, 200])(
    '%# - calculates expected values for %i days',
    (T) => {
      expect(new HerdService().getHerd(T)).toMatchSnapshot();
    },
  );
});
