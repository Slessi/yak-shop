import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

jest.mock('./stock.service', () => ({
  StockService: class {
    getStock() {
      return { milk: 10, skins: 10 };
    }
  },
}));

describe('StockController', () => {
  let stockController: StockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService],
    }).compile();

    stockController = app.get<StockController>(StockController);
  });

  it('should return correct data from getStock', () => {
    expect(stockController.getStock(10)).toEqual({
      milk: 10,
      skins: 10,
    });
  });
});
