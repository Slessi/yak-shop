import { Test, TestingModule } from '@nestjs/testing';
import { Stock, StockService } from 'src/stock/stock.service';
import { OrderStatus } from './order.dto';
import { OrderService } from './order.service';

interface StockServiceMock {
  reserveStock: jest.Mock;
}

jest.mock('src/stock/stock.service', () => ({
  StockService: class {
    reserveStock = jest.fn();
  },
}));

describe('OrderService', () => {
  let orderService: OrderService;
  let stockService: StockServiceMock;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [OrderService, StockService],
    }).compile();

    orderService = app.get(OrderService);
    stockService = app.get(StockService);
  });

  it.each<[OrderStatus, Partial<Stock>]>([
    [OrderStatus.FULLY_COMPLETE, { milk: 100, skins: 10 }],
    [OrderStatus.PARTIALLY_COMPLETE, { skins: 10 }],
    [OrderStatus.IMPOSSIBLE, {}],
  ])(
    '%# - handleOrder returns correct data for reserved stock %p',
    (status, reservedStock) => {
      stockService.reserveStock.mockReturnValueOnce(reservedStock);

      expect(orderService.handleOrder(10, { milk: 100, skins: 10 })).toEqual({
        status,
        reservedStock,
      });
    },
  );
});
