import { Module } from '@nestjs/common';
import { StockModule } from 'src/stock/stock.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [StockModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
