import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderStatus } from './order.dto';
import { OrderService } from './order.service';

interface OrderServiceMock {
  handleOrder: jest.Mock;
}

jest.mock('./order.service', () => ({
  OrderService: class {
    handleOrder = jest.fn();
  },
}));

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderServiceMock;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = app.get(OrderController);
    orderService = app.get(OrderService);
  });

  it('should return correct data from createOrder', () => {
    const mockResponse = { status: jest.fn() } as any;
    orderService.handleOrder.mockReturnValueOnce({
      status: OrderStatus.FULLY_COMPLETE,
      reservedStock: { milk: 10, skins: 10 },
    });

    expect(
      orderController.createOrder(mockResponse, 14, {
        customer: '',
        order: { milk: 10, skins: 10 },
      }),
    ).toEqual({ milk: 10, skins: 10 });
  });

  it.each([
    [OrderStatus.FULLY_COMPLETE, 201],
    [OrderStatus.PARTIALLY_COMPLETE, 206],
    [OrderStatus.IMPOSSIBLE, 403],
  ])(
    '%# - for status %i should return status code %i from createOrder',
    (status, statusCode) => {
      const mockResponse = { status: jest.fn() } as any;
      orderService.handleOrder.mockReturnValueOnce({
        status,
        reservedStock: { milk: 10, skins: 10 },
      });

      orderController.createOrder(mockResponse, 14, {
        customer: '',
        order: { milk: 10, skins: 10 },
      });

      expect(mockResponse.status).toHaveBeenLastCalledWith(statusCode);
    },
  );
});
