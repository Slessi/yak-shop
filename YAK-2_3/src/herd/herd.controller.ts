import { Controller, Get, Param } from '@nestjs/common';
import { DaysParams } from 'src/common/DaysParams';
import { HerdService } from './herd.service';

@Controller('herd')
export class HerdController {
  constructor(private herdService: HerdService) {}

  @Get(':T')
  getHerd(@Param() { T }: DaysParams) {
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
