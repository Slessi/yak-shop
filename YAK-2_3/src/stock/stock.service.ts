import { Injectable } from '@nestjs/common';
import { HerdService } from 'src/herd/herd.service';
import { OrderDto } from 'src/order/order.dto';
import { round } from 'src/round';

export interface Stock {
  milk: number;
  skins: number;
}

@Injectable()
export class StockService {
  private stock?: Stock;
  private reservedStock: Stock = { milk: 0, skins: 0 };

  constructor(private herdService: HerdService) {}

  public getStock(totalDays: number): Stock {
    if (!this.stock) {
      this.stock = this.createStock(totalDays);
    }

    return {
      milk: round(this.stock.milk - this.reservedStock.milk),
      skins: round(this.stock.skins - this.reservedStock.skins),
    };
  }

  public reserveStock(
    totalDays: number,
    { milk: milkRequested, skins: skinsRequested }: OrderDto,
  ) {
    const { milk: milkAvailable, skins: skinsAvailable } =
      this.getStock(totalDays);

    const milkToReserve = Math.min(milkRequested, milkAvailable);
    const skinToReserve = Math.min(skinsRequested, skinsAvailable);

    this.reservedStock.milk = round(this.reservedStock.milk + milkToReserve);
    this.reservedStock.skins = round(this.reservedStock.skins + skinToReserve);

    return {
      milk: milkToReserve,
      skins: skinToReserve,
    };
  }

  private createStock(totalDays: number) {
    const data = this.herdService.getHerd(totalDays);

    return data.reduce(
      (prev, result) => {
        prev.milk += result.milk;
        prev.skins += result.skins;

        return prev;
      },
      { milk: 0, skins: 0 },
    );
  }
}
