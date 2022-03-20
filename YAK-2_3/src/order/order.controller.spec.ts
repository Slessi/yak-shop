import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let orderController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderController.getHello()).toBe('Hello World!');
    });
  });
});
