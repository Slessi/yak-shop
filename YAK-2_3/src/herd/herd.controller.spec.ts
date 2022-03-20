import { Test, TestingModule } from '@nestjs/testing';
import { HerdService } from './herd.service';
import { HerdController } from './herd.controller';

jest.mock('./herd.service', () => ({
  HerdService: class {
    getHerd(T: number) {
      return [
        {
          name: 'name',
          age: T,
          ageLastShaved: T,
        },
      ];
    }
  },
}));

describe('HerdController', () => {
  let herdController: HerdController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HerdController],
      providers: [HerdService],
    }).compile();

    herdController = app.get<HerdController>(HerdController);
  });

  it('should return correct data from getHerd', () => {
    expect(herdController.getHerd(10)).toEqual({
      herd: [{ name: 'name', age: 10, 'age-last-shaved': 10 }],
    });
  });
});
