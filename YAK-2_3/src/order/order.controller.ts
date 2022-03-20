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
import { OrderService, OrderStatus } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post(':T')
  postOrder(
    @Res({ passthrough: true }) res: Response,
    @Param('T', ParseIntPipe) T: number,
    @Body() { order }: CreateOrderDto,
  ) {
    const { status, reservedStock } = this.orderService.handleOrder(T, order);

    switch (status) {
      case OrderStatus.FULLY_COMPLETE:
        res.status(201);
        break;
      case OrderStatus.PARTIALLY_COMPLETE:
        res.status(206);
        break;
      case OrderStatus.IMPOSSIBLE:
        res.status(403);
        return;
    }

    return reservedStock;
  }
}
