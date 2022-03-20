import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('stock')
export class StockController {
  constructor(private appService: AppService) {}

  @Get(':T')
  getStock(@Param('T', ParseIntPipe) T: number) {
    const data = this.appService.calculate(T);

    return data.reduce(
      (prev, result) => {
        prev.milk += result.milk;
        prev.wool += result.wool;

        return prev;
      },
      { milk: 0, wool: 0 },
    );
  }
}
