import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':T')
  getStock(@Param('T', ParseIntPipe) T: number) {
    return this.stockService.getStock(T);
  }
}
