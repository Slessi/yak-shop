import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum OrderStatus {
  FULLY_COMPLETE,
  PARTIALLY_COMPLETE,
  IMPOSSIBLE,
}

export class OrderDto {
  @IsNumber()
  milk?: number;

  @IsNumber()
  skins?: number;
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
