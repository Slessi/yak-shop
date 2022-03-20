import { Test, TestingModule } from '@nestjs/testing';
import { HerdController } from './herd.controller';

describe('HerdController', () => {
  let herdController: HerdController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HerdController],
    }).compile();

    herdController = app.get<HerdController>(HerdController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(herdController.getHello()).toBe('Hello World!');
    });
  });
});
