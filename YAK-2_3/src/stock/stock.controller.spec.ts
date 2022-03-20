import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';

describe('StockController', () => {
  let stockController: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
    }).compile();

    stockController = app.get<StockController>(StockController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stockController.getHello()).toBe('Hello World!');
    });
  });
});
