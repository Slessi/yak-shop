import { Injectable } from '@nestjs/common';
import { StockService } from 'src/stock/stock.service';
import { OrderDto, OrderStatus } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private stockService: StockService) {}

  /**
   *   You can assume that requests come in ascending order of time. If you cannot
  fulfill one of the ordered goods of the order because you’re out of stock, you
  deliver the other goods that are fully in stock.

  So for instance if your stock contains 4000 liters of milk and 10 yak hides, and
  your customer orders 4500 liters of milk and 4 hides, you only deliver the 4 hides
  (and omit the milk from the result) and give a Http status code 206 (partial content).

  - If the full order is not in stock, you only return a Http 404 status code.
  - If the order was placed successfully you return Http status code 201 (created) with the resulting order
 */
  handleOrder(totalDays: number, order: OrderDto) {
    const reservedStock = this.stockService.reserveStock(totalDays, order);

    let status: OrderStatus;

    if (reservedStock.milk && reservedStock.skins) {
      status = OrderStatus.FULLY_COMPLETE;
    } else if (!reservedStock.milk && !reservedStock.skins) {
      status = OrderStatus.IMPOSSIBLE;
    } else {
      status = OrderStatus.PARTIALLY_COMPLETE;
    }

    return { status, reservedStock };
  }
}
