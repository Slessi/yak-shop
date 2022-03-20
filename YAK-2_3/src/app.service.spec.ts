import { AppService } from './app.service';

describe('AppService', () => {
  it.each<number>([13, 14, 200])('calculates expected values', (T) => {
    expect(new AppService().calculate(T)).toMatchSnapshot();
  });
});
