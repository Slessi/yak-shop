import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class DaysParams {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  T!: number;
}
