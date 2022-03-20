import { Test, TestingModule } from '@nestjs/testing';
import { HerdService } from 'src/herd/herd.service';
import { StockService } from 'src/stock/stock.service';

interface HerdServiceMock {
  getHerd: jest.Mock;
}

jest.mock('src/herd/herd.service', () => ({
  HerdService: class {
    getHerd = jest.fn();
  },
}));

describe('StockService', () => {
  let stockService: StockService;
  let herdService: HerdServiceMock;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [StockService, HerdService],
    }).compile();

    stockService = app.get(StockService);
    herdService = app.get(HerdService);
  });

  it('should return correct stock', () => {
    herdService.getHerd.mockReturnValueOnce([
      { milk: 378.65, skins: 1 },
      { milk: 258.65, skins: 1 },
      { milk: 213.65, skins: 1 },
    ]);

    expect(stockService.getStock(10)).toEqual({ milk: 850.95, skins: 3 });
  });

  it('should handle consecutive orders', () => {
    herdService.getHerd.mockReturnValue([
      { milk: 378.65, skins: 1 },
      { milk: 258.65, skins: 1 },
      { milk: 213.65, skins: 1 },
    ]);

    expect(stockService.reserveStock(10, { milk: 100, skins: 3 })).toEqual({
      milk: 100,
      skins: 3,
    });

    expect(stockService.reserveStock(10, { milk: 100, skins: 3 })).toEqual({
      milk: 100,
    });

    expect(stockService.reserveStock(10, { milk: 650.95, skins: 3 })).toEqual({
      milk: 650.95,
    });

    expect(stockService.reserveStock(10, { milk: 650.95, skins: 3 })).toEqual(
      {},
    );
  });
});
