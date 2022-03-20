import { Module } from '@nestjs/common';
import { HerdController } from './herd.controller';
import { HerdService } from './herd.service';

@Module({
  controllers: [HerdController],
  providers: [HerdService],
  exports: [HerdService],
})
export class HerdModule {}
