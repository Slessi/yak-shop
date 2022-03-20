import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  milk!: number;

  @IsNumber()
  @IsNotEmpty()
  skins!: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customer!: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => OrderDto)
  order!: OrderDto;
}
