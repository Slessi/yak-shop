import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HerdService } from './herd.service';

@Controller('herd')
export class HerdController {
  constructor(private herdService: HerdService) {}

  @Get(':T')
  getHerd(@Param('T', ParseIntPipe) T: number) {
    const data = this.herdService.getHerd(T);

    return {
      herd: data.map((d) => ({
        name: d.name,
        age: d.age,
        'age-last-shaved': d.ageLastShaved,
      })),
    };
  }
}
