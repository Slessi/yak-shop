import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HerdController } from './herd/herd.controller';
import { OrderController } from './order/order.controller';
import { StockController } from './stock/stock.controller';

@Module({
  imports: [],
  controllers: [HerdController, StockController, OrderController],
  providers: [AppService],
})
export class AppModule {}
