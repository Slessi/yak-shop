import { Controller, Get, Param } from '@nestjs/common';
import { DaysParams } from 'src/common/DaysParams';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':T')
  getStock(@Param() { T }: DaysParams) {
    return this.stockService.getStock(T);
  }
}
