import { Module } from '@nestjs/common';
import { HerdModule } from 'src/herd/herd.module';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [HerdModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
