import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
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
  @Post(':T')
  postOrder(
    @Res({ passthrough: true }) res: Response,
    @Param('T', ParseIntPipe) T: number,
    @Body() body: CreateOrderDto,
  ) {
    if (false) {
      res.status(206);

      return {
        name: `where ${T} is the day the customer orders, this means that day ${T} has not elapsed.`,
        skins: 3,
      };
    }

    if (false) {
      res.status(404);
    }

    return {
      name: `where ${T} is the day the customer orders, this means that day ${T} has not elapsed.`,
      milk: 1100.0,
      skins: 3,
    };
  }
}
