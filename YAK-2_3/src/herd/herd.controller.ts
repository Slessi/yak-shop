import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('herd')
export class HerdController {
  constructor(private appService: AppService) {}

  @Get(':T')
  getHerd(@Param('T', ParseIntPipe) T: number) {
    const data = this.appService.calculate(T);

    return {
      herd: data.map((d) => ({
        name: d.name,
        age: Number(d.age.toFixed(2)),
        'age-last-shaved': Number(d.ageLastShaved.toFixed(2)),
      })),
    };
  }
}
